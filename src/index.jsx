import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/inc/Header";
import Main from "./pages/Main";
import Brands from "./pages/Brands";
import Suppliers from "./pages/Suppliers";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import LocalWarehouse from "./pages/LocalWarehouse";
import Surcharges from "./pages/Surcharges";
import HistoryImportPrice from "./pages/HistoryImportPrice";
import NotFound from "./pages/NotFound";
import Container from 'react-bootstrap/Container';
import { HistoryImportPriceProvider } from "./contexts/HistoryImportPriceProvider";
import { BrandImportProvider } from "./contexts/BrandImportProvider";
import { SuppliersProvider } from "./contexts/SuppliersProvider";
import { SurchargesProvider } from "./contexts/SurchargesProvider";
import { OrdersProvider } from "./contexts/OrdersProvider";
import { ProductsProvider } from "./contexts/ProductsProvider";
import { ArchiveOrdersProvider } from "./contexts/ArchiveOrdersProvider";
import ArchiveOrders from "./pages/ArchiveOrders";
import { LocalWarehousesProductsProvider } from "./contexts/LocalWarehousesProductsProvider";
import LocalWarehousesProducts from "./pages/LocalWarehousesProducts";
import { LocalWarehousesProvider } from "./contexts/LocalWarehousesProvider";
import { SelectProductModalViewProvider } from "./contexts/SelectProductModalViewProvider";
import CreateLocalWarehouse from "./pages/CreateLocalWarehouse";
import { CreateLocalWarehouseProvider } from "./contexts/CreateLocalWarehouseProvider";
import { LocalWarehouseCreateNewBoxProvider } from "./contexts/LocalWarehouseCreateNewBoxProvider";
import { ToastsOverlayProvider } from "./contexts/ToastsOverlayProvider";
import ToastsOverlay from "./pages/ToastsOverlay";
import { LocalWarehouseAddProductProvider } from "./contexts/LocalWarehouseAddProductProvider";
import LocalWarehouseAddProduct from "./pages/LocalWarehousesAddProduct";
import AddProduct from "./pages/AddProduct";

let element = document.getElementById("root");

if (!element) {
    element = document.createElement("div");
    element.id = "root";
};

function BasicProviders({ children }) {
    return <>
        <ToastsOverlayProvider>
            <SelectProductModalViewProvider>
                <HistoryImportPriceProvider>
                    <BrandImportProvider>
                        <SuppliersProvider>
                            <SurchargesProvider>
                                <OrdersProvider>
                                    <ProductsProvider>
                                        <ArchiveOrdersProvider>
                                            <LocalWarehousesProvider>
                                                <LocalWarehousesProductsProvider>
                                                    <LocalWarehouseCreateNewBoxProvider>
                                                        <LocalWarehouseAddProductProvider>
                                                            <CreateLocalWarehouseProvider>
                                                                {children}
                                                            </CreateLocalWarehouseProvider>
                                                        </LocalWarehouseAddProductProvider>
                                                    </LocalWarehouseCreateNewBoxProvider>
                                                </LocalWarehousesProductsProvider>
                                            </LocalWarehousesProvider>
                                        </ArchiveOrdersProvider>
                                    </ProductsProvider>
                                </OrdersProvider>
                            </SurchargesProvider>
                        </SuppliersProvider>
                    </BrandImportProvider>
                </HistoryImportPriceProvider>
            </SelectProductModalViewProvider>
        </ToastsOverlayProvider>
    </>
};

const root = createRoot(element);

root.render(<>

    <BasicProviders>
        <BrowserRouter>

            <Header />
            <ToastsOverlay>
                <Container>

                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/archive" element={<ArchiveOrders />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="products/add" element= {<AddProduct/>}/>
                        <Route path="/brands" element={<Brands />} />
                        <Route path="/suppliers" element={<Suppliers />} />
                        <Route path="/surcharges" element={<Surcharges />} />
                        <Route path="/localwarehouses" element={<LocalWarehouse />} />
                        <Route path="/localwarehousesProducts" element={<LocalWarehousesProducts />} />
                        <Route path="/localwarehousesProducts/addProduct" element={<LocalWarehouseAddProduct />} />
                        <Route path="/localwarehouses/create" element={<CreateLocalWarehouse />} />
                        <Route path="/historyImportPrice" element={
                            <HistoryImportPrice />} />
                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                </Container>
            </ToastsOverlay>
        </BrowserRouter>

    </BasicProviders>
</>)

