import { Link } from "react-router-dom";

function idxCategory() {
    return (
        <div className="category clearfix">
            <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1>Danh Mục Sản Phẩm</h1>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item">
                                    <Link to="#">Bảng điều khiển</Link>
                                </li>
                                <li class="breadcrumb-item active">Tất cả danh mục</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default idxCategory;
