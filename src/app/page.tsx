import {
  BasicBreadcrumbs,
  FilterList,
  Layout,
  ProductList,
} from "./components";

export default function Home() {
  return (
    <Layout>
      <div className="px-3">
        <div className="row-start-2 row-end-3 w-full">
          <div className="flex flex-row justify-between px-5 py-3 items-center">
            <BasicBreadcrumbs />
            <FilterList />
          </div>
        </div>
        <ProductList />
      </div>
    </Layout>
  );
}
