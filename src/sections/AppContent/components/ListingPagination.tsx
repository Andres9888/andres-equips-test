import { Pagination } from 'antd';

interface Props {
  total: number;
  page: number;
  limit: number;
  setPage: (page: number) => void;
}
export const ListingPagination = ({ page, setPage, limit, total }: Props) => {
  return (
    <Pagination
      hideOnSinglePage
      showLessItems
      className="listings-pagination"
      current={page}
      pageSize={limit}
      showSizeChanger={false}
      total={total}
      onChange={(newPage: number) => setPage(newPage)}
    />
  );
};
