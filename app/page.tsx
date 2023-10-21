import Pagination from './components/Pagination';

export default function Home() {
  return (
    <div>
      <Pagination currentPage={10} itemCount={100} pageSize={10} />
    </div>
  );
}
