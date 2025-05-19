
import React, { useState, useRef } from 'react';
import { Upload, File, Trash, Download, Image, FileText as FileIcon, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/components/ui/use-toast';

// Mock file data
const initialFiles = [
  { 
    id: "1", 
    name: "project-requirements.pdf", 
    type: "pdf", 
    size: "2.4 MB", 
    uploaded: "May 10, 2023", 
    uploadedBy: "Alex Johnson" 
  },
  { 
    id: "2", 
    name: "wireframes.fig", 
    type: "fig", 
    size: "8.7 MB", 
    uploaded: "May 12, 2023", 
    uploadedBy: "Emma Davis" 
  },
  { 
    id: "3", 
    name: "logo.png", 
    type: "image", 
    size: "356 KB", 
    uploaded: "May 14, 2023", 
    uploadedBy: "Ryan Smith" 
  },
  { 
    id: "4", 
    name: "api-documentation.md", 
    type: "document", 
    size: "128 KB", 
    uploaded: "May 15, 2023", 
    uploadedBy: "Alex Johnson" 
  },
  { 
    id: "5", 
    name: "app-mockup.jpg", 
    type: "image", 
    size: "1.2 MB", 
    uploaded: "May 16, 2023", 
    uploadedBy: "Emma Davis" 
  }
];

const FileUpload = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState(initialFiles);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setUploadingFiles([...uploadingFiles, ...newFiles]);
      
      // Reset the input to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  // Handle file drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setUploadingFiles([...uploadingFiles, ...newFiles]);
    }
  };
  
  // Handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  // Handle drag leave
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  // Handle file upload
  const handleUpload = () => {
    // In a real app, you would send files to a server here
    // For this demo, we'll just add them to our local state
    
    const newUploadedFiles = uploadingFiles.map((file, index) => ({
      id: (files.length + index + 1).toString(),
      name: file.name,
      type: getFileType(file.name),
      size: formatFileSize(file.size),
      uploaded: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      uploadedBy: "Alex Johnson" // Current user in this demo
    }));
    
    setFiles([...files, ...newUploadedFiles]);
    setUploadingFiles([]);
    
    toast({
      title: "Files uploaded",
      description: `Successfully uploaded ${newUploadedFiles.length} file(s)`,
    });
  };
  
  // Handle removing a file from the upload list
  const handleRemoveUploadFile = (index: number) => {
    const newUploadingFiles = [...uploadingFiles];
    newUploadingFiles.splice(index, 1);
    setUploadingFiles(newUploadingFiles);
  };
  
  // Handle deleting an uploaded file
  const handleDeleteFile = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
    
    toast({
      title: "File deleted",
      description: "File has been successfully deleted",
    });
  };
  
  // Filter files by search query
  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Get file type from filename
  const getFileType = (filename: string): string => {
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    
    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extension)) {
      return 'image';
    } else if (['doc', 'docx', 'txt', 'md', 'rtf'].includes(extension)) {
      return 'document';
    } else if (['pdf'].includes(extension)) {
      return 'pdf';
    } else if (['xls', 'xlsx', 'csv'].includes(extension)) {
      return 'spreadsheet';
    } else if (['mp4', 'mov', 'avi', 'webm'].includes(extension)) {
      return 'video';
    } else if (['mp3', 'wav', 'ogg'].includes(extension)) {
      return 'audio';
    } else {
      return extension;
    }
  };
  
  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Get file icon based on type
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image size={20} className="text-blue-500" />;
      case 'pdf':
        return <FileIcon size={20} className="text-red-500" />;
      case 'document':
        return <FileIcon size={20} className="text-blue-500" />;
      case 'spreadsheet':
        return <FileIcon size={20} className="text-green-500" />;
      case 'video':
        return <FileIcon size={20} className="text-purple-500" />;
      case 'audio':
        return <FileIcon size={20} className="text-yellow-500" />;
      default:
        return <File size={20} className="text-gray-500" />;
    }
  };
  
  // Filter files by type
  const imageFiles = filteredFiles.filter(file => file.type === 'image');
  const documentFiles = filteredFiles.filter(file => ['document', 'pdf', 'spreadsheet'].includes(file.type));
  const otherFiles = filteredFiles.filter(file => !['image', 'document', 'pdf', 'spreadsheet'].includes(file.type));
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div>
          <h2 className="text-xl font-bold dark:text-white">Files & Resources</h2>
          <p className="text-gray-600 dark:text-gray-300">Upload and manage project files</p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search files..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button onClick={() => fileInputRef.current?.click()}>
            <Upload size={16} className="mr-2" /> Upload
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            multiple
          />
        </div>
      </div>
      
      {/* Drop Area */}
      {uploadingFiles.length === 0 ? (
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 dark:border-gray-700'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Upload size={24} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold dark:text-white mb-2">
            {isDragging ? 'Drop files here' : 'Drag & Drop Files'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">or</p>
          <Button onClick={() => fileInputRef.current?.click()}>
            Choose Files
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg p-6 dark:border-gray-700">
          <h3 className="font-semibold mb-4 dark:text-white flex items-center">
            <Upload size={18} className="mr-2" /> Files to Upload
          </h3>
          
          <div className="space-y-3 mb-4">
            {uploadingFiles.map((file, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md"
              >
                <div className="flex items-center gap-3">
                  {getFileIcon(getFileType(file.name))}
                  <div>
                    <p className="text-sm font-medium dark:text-white">{file.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                
                <button 
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  onClick={() => handleRemoveUploadFile(index)}
                >
                  <Trash size={16} />
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setUploadingFiles([])}>
              Cancel
            </Button>
            <Button onClick={handleUpload}>
              Upload {uploadingFiles.length} File{uploadingFiles.length !== 1 ? 's' : ''}
            </Button>
          </div>
        </div>
      )}
      
      {/* Files Display */}
      {filteredFiles.length > 0 && (
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">
              All Files ({filteredFiles.length})
            </TabsTrigger>
            <TabsTrigger value="images">
              Images ({imageFiles.length})
            </TabsTrigger>
            <TabsTrigger value="documents">
              Documents ({documentFiles.length})
            </TabsTrigger>
            <TabsTrigger value="others">
              Others ({otherFiles.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="rounded-lg border dark:border-gray-700 overflow-hidden">
              <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 p-4 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400">
                <div className="col-span-2">Name</div>
                <div className="hidden lg:block">Size</div>
                <div className="hidden lg:block">Uploaded</div>
                <div>Actions</div>
              </div>
              
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredFiles.map(file => (
                  <div key={file.id} className="grid grid-cols-3 lg:grid-cols-5 gap-4 p-4 items-center">
                    <div className="col-span-2 flex items-center gap-3">
                      {getFileIcon(file.type)}
                      <div>
                        <p className="text-sm font-medium dark:text-white">{file.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Uploaded by {file.uploadedBy}
                        </p>
                      </div>
                    </div>
                    <div className="hidden lg:block text-sm text-gray-500 dark:text-gray-400">
                      {file.size}
                    </div>
                    <div className="hidden lg:block text-sm text-gray-500 dark:text-gray-400">
                      {file.uploaded}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost">
                        <Download size={16} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-red-500" 
                        onClick={() => handleDeleteFile(file.id)}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="images">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {imageFiles.map(file => (
                <div 
                  key={file.id}
                  className="border dark:border-gray-700 rounded-lg overflow-hidden flex flex-col"
                >
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Image size={32} className="text-gray-400" />
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate dark:text-white">{file.name}</p>
                      <div className="flex">
                        <Button size="sm" variant="ghost">
                          <Download size={14} />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-red-500"
                          onClick={() => handleDeleteFile(file.id)}
                        >
                          <Trash size={14} />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {file.size} • {file.uploaded}
                    </p>
                  </div>
                </div>
              ))}
              
              <div 
                className="border-2 border-dashed dark:border-gray-700 rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Plus size={20} className="text-primary" />
                </div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Add Image</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="documents">
            <div className="rounded-lg border dark:border-gray-700 overflow-hidden">
              <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 p-4 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400">
                <div className="col-span-2">Name</div>
                <div className="hidden lg:block">Size</div>
                <div className="hidden lg:block">Uploaded</div>
                <div>Actions</div>
              </div>
              
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {documentFiles.map(file => (
                  <div key={file.id} className="grid grid-cols-3 lg:grid-cols-5 gap-4 p-4 items-center">
                    <div className="col-span-2 flex items-center gap-3">
                      {getFileIcon(file.type)}
                      <div>
                        <p className="text-sm font-medium dark:text-white">{file.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Uploaded by {file.uploadedBy}
                        </p>
                      </div>
                    </div>
                    <div className="hidden lg:block text-sm text-gray-500 dark:text-gray-400">
                      {file.size}
                    </div>
                    <div className="hidden lg:block text-sm text-gray-500 dark:text-gray-400">
                      {file.uploaded}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost">
                        <Download size={16} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-red-500" 
                        onClick={() => handleDeleteFile(file.id)}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="others">
            <div className="rounded-lg border dark:border-gray-700 overflow-hidden">
              <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 p-4 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400">
                <div className="col-span-2">Name</div>
                <div className="hidden lg:block">Size</div>
                <div className="hidden lg:block">Uploaded</div>
                <div>Actions</div>
              </div>
              
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {otherFiles.map(file => (
                  <div key={file.id} className="grid grid-cols-3 lg:grid-cols-5 gap-4 p-4 items-center">
                    <div className="col-span-2 flex items-center gap-3">
                      {getFileIcon(file.type)}
                      <div>
                        <p className="text-sm font-medium dark:text-white">{file.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Uploaded by {file.uploadedBy}
                        </p>
                      </div>
                    </div>
                    <div className="hidden lg:block text-sm text-gray-500 dark:text-gray-400">
                      {file.size}
                    </div>
                    <div className="hidden lg:block text-sm text-gray-500 dark:text-gray-400">
                      {file.uploaded}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost">
                        <Download size={16} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-red-500" 
                        onClick={() => handleDeleteFile(file.id)}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default FileUpload;
