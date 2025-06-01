import Pagination from "./components/pagination";

interface SearchParams {
  searchParams: {page: string};
}


export default function Home({ searchParams }: SearchParams) {
  return (
    <div>
      Hello World


      <Pagination itemCount={167} pageSize={10} currentPage={parseInt(searchParams.page)} />
    </div>
  );
}
