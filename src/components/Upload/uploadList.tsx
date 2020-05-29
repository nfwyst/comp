import React, { FC } from 'react'
import { UploadFileStatusProps } from './upload'
import Icon from '../Icon/icon'

export interface UploadListProps {
  fileList?: UploadFileStatusProps[];
  onRemove?: (_file: UploadFileStatusProps) => void;
}

export const UploadList: FC<UploadListProps> = props => {
  const { fileList = [], onRemove } = props
  return (
    <ul className="upload-list">
      {fileList.map(item => {
        return (
          <li key={item.id} className="upload-list-item">
            <span className={`file-name file-name-${item.status}`}>
              <Icon
                icon="file-alt"
                theme="info"
                style={{ marginRight: 5 }}
              />
              {item.name}
            </span>
            <span className="file-status">
              {item.status === 'uploading' && <Icon icon="spinner" spin theme="primary" />}
              {item.status === 'done' && <Icon icon="check-circle" theme="success" />}
              {item.status === 'error' && <Icon icon="times-circle" theme="danger" />}
            </span>
            <span className="file-actions">
              <Icon icon="times" onClick={() => onRemove && onRemove(item)} />
            </span>
          </li>
        )
      })}
    </ul>
  )
}

UploadList.defaultProps = {
  fileList: []
}

export default UploadList
