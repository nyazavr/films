import React from 'react';
import { Alert, Space } from 'antd';

const ErrorMessage = () => {
  return (
    <Space className="ErrorMessage">
      <Alert message="Случилась ошибка"></Alert>
    </Space>
  );
};

export default ErrorMessage;
