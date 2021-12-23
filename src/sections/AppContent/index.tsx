// @ts-nocheck

/* eslint-disable */
import { BankTwoTone, HomeTwoTone } from '@ant-design/icons';
import { Card, List, Layout, Typography } from 'antd';
const { Text, Title } = Typography;
const { Content } = Layout;
function AppContent({ data, error }) {
  if (!data) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return (
    <Content className="home">
      <div className="home-listings">
        <List
          grid={{
            gutter: 8,
            xs: 1,
            sm: 2,
            lg: 4,
          }}
          dataSource={data.data}
          renderItem={bank => (
            <List.Item>
              <Card hoverable>
                <div className="listing-card__details">
                  <div className="listing-card__description">
                    <Title level={4} className="listing-card__price">
                      <BankTwoTone />
                      {bank.data.NAME}
                    </Title>
                    <Text strong ellipsis className="listing-card__title">
                      <HomeTwoTone />
                      {bank.data.ADDRESS}
                    </Text>
                    <Text ellipsis className="listing-card__address">
                      {`${bank.data.STNAME} , ${bank.data.ZIP}`}
                    </Text>
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </Content>
  );
}

export default AppContent;
