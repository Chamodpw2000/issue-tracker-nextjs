import Pagination from "./components/pagination";
import LatestIssue from "./issues/LatestIssue";

interface SearchParams {
  searchParams: {page: string};
}


export default function Home({ searchParams }: SearchParams) {
  return (
    <div>
<LatestIssue/>


    </div>
  );
}
