/* eslint-disable */
// @ts-nocheck

import { Card, List, Layout } from 'antd';
const { Content } = Layout;
const emptyData = new Array(16).fill({});
export const ListingSkeleton = () => {
  return (
    <Content className="home">
      <div className="home-listings">
        <List
          grid={{
            gutter: 16,
            column: 4,
            xs: 1,
            sm: 2,
            lg: 4,
          }}
          dataSource={emptyData}
          renderItem={() => (
            <List.Item>
              <Card loading className="listings-skeleton__card" />
            </List.Item>
          )}
        />
      </div>
    </Content>
  );
};
