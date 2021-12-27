import { Drawer } from 'antd';
import { Drawer as DrawerData } from 'types';

interface Props {
  isVisible: boolean;
  children: JSX.Element | null;
  setDrawer: (drawer: DrawerData) => void;
}
export const ListingDrawer = ({ isVisible, setDrawer, children }: Props) => {
  return (
    <Drawer
      closable
      placement="right"
      visible={isVisible}
      width={640}
      onClose={() => {
        setDrawer({
          visible: false,
          currentBank: null,
        });
      }}
    >
      {children}
    </Drawer>
  );
};
