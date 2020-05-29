import React, { FC, useRef, ChangeEvent, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Button from '../Button/button';
import { UploadList } from './uploadList';

export interface UploadProps {
  // 上传文件的地址
  action: string;
  // 文件上传进度的回调
  onProgress?: (percentage: number, file: File) => void;
  // 文件上传成功的回调
  onSuccess?: (data: any, file: File) => void;
  // 文件上传错误的回调
  onError?: (err: any, file: File) => void;
  // 文件上传之前的处理回调
  beforeUpload?: (file: File) => boolean | Promise<File>;
  // onChange 回调
  onChange?: (file: File) => void;
  // 默认文件列表
  defaultFileList?: UploadFileStatusProps[];
  // 删除一个文件列表
  onRemove?: (file: UploadFileStatusProps) => void;
}

export type UploadFileStatus = 'ready' | 'uploading' | 'error' | 'done'

export interface UploadFileStatusProps {
  // 文件 id
  id: string;
  // 文件大小
  size: number;
  // 文件名称
  name: string;
  // 文件状态
  status?: UploadFileStatus;
  // 文件上传百分比
  percent?: number;
  // 原始文件信息
  raw?: File;
  response?: AxiosResponse,
  error?: Error
}

export const Upload: FC<UploadProps> = props => {
  const {
    action, onProgress, onSuccess, onError,
    onChange, beforeUpload, defaultFileList, onRemove, ...restProps
  } = props
  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFileStatusProps[]>(defaultFileList || [])
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    uploadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }
  const uploadFiles = (files: FileList) => {
    let postFiles = [...files]
    postFiles.forEach(file => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result instanceof Promise) {
          result.then(processedFile => {
            post(processedFile)
          })
        } else if (result !== false) {
          post(file)
        }
      }
    })
  }
  const pushFileList = (file: File, options: {
    status: UploadFileStatus,
    percent: number,
    id: string
  }) => {
    let _file: UploadFileStatusProps = {
      name: file.name,
      size: file.size,
      raw: file,
      ...options
    }
    setFileList([...fileList, _file])
    return _file
  }
  const updateFileList = (updateFile: UploadFileStatusProps, updateObj: Partial<UploadFileStatusProps>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.id === updateFile.id) {
          return { ...file, ...updateObj }
        } else {
          return { ...file }
        }
      })
    })
  }
  const post = (file: File) => {
    const _file = pushFileList(file, {
      status: 'ready', percent: 0, id: `${Date.now()}upload-file`
    })
    const formData = new FormData()
    formData.append(file.name, file)
    axios.post(action, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (e) => {
        const percentage = Math.round((e.loaded * 100) / e.total) || 0
        if (percentage < 100) {
          updateFileList(_file, { percent: percentage, status: 'uploading' })
          if (onProgress) {
            onProgress(percentage, file)
          }
        }
      }
    }).then((res: AxiosResponse) => {
      updateFileList(_file, { response: res.data, status: 'done' })
      if (onSuccess) onSuccess(res.data, file)
      onChange && onChange(file)
    }).catch(e => {
      updateFileList(_file, { error: e, status: 'error' })
      if (onError) onError(e, file)
      onChange && onChange(file)
    })
  }
  const handleRemove = (file: UploadFileStatusProps) => {
    setFileList(prevList => {
      return prevList.filter(item => item.id !== file.id)
    })
    onRemove && onRemove(file)
  }
  return (
    <div className="upload">
      <Button type="primary" {...restProps} onClick={handleClick}>上传文件</Button>
      <input
        type="file"
        ref={fileInput}
        className="upload-input"
        hidden
        onChange={handleFileChange}
      />
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  )
}

export default Upload
