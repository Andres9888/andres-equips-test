import { Card, List, Layout } from 'antd';
import { gridOptions } from 'config/ListGridConfig';

const { Content } = Layout;
const emptyData = new Array(16).fill({});
export const ListingSkeleton = () => {
  return (
    <Content className="home">
      <div className="home-listings">
        <List
          dataSource={emptyData}
          grid={gridOptions}
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
