// @ts-nocheck

/* eslint-disable */
function AppContent({ data, error }) {
  if (!data) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return (
    <div>
      {data.data.map(bank => (
        <h1>{bank.data.ADDRESS}</h1>
      ))}
    </div>
  );
}

export default AppContent;
