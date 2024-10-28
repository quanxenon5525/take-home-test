import {
  BasicBreadcrumbs,
  FilterList,
  Layout,
  ProductList,
} from "./components";
import { ProductProvider } from "./components/context/ProductDataContext";

export default function Home() {
  return (
    <Layout>
      <ProductProvider>
        <ProductList />
      </ProductProvider>
    </Layout>
  );
}
