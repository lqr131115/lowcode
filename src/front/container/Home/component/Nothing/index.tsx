import { Button, Empty } from 'antd';
import React from 'react';

const Nothing: React.FC = () => (
    <Empty description={false}>
        <Button type="primary" href='/admin.html'>前往配置</Button>
    </Empty>
);

export default Nothing;