import React from 'react'
import styles from "./New.module.scss";
type Props = {}

const News = (props: Props) => {
    return (
        <div className='bg-white my-3'>
            <main className="container">
                <div className=" news-banner p-4 p-md-5 mb-4 text-white rounded bg-dark">
                    <div className="col-md-6 px-0">
                        <h1 className="display-4 fst-italic">"Ford v Ferrari" (2022)</h1>
                        <p className="lead my-3">Bale đóng tay đua nổi tiếng Ken Miles. Nhân vật có niềm đam mê bất tận với các loại
                            ôtô và dường như không quan tâm đến những thứ khác.</p>
                        <p className="lead mb-0"><a href="#" className="text-white fw-bold">Xem thêm...</a></p>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-md-6 news-list">
                        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                                <strong className="d-inline-block mb-2 text-primary">Mới nhất</strong>
                                <h3 className="mb-0">10 vai diễn làm nên tên tuổi -
                                    Timothée Chalamet </h3>
                                <div className="mb-1 text-muted">Nov 12</div>
                                <p className="card-text mb-auto">Tài tử Christian Bale được mệnh danh "tắc kè hoa" .</p>
                                <a href="#" className="stretched-link">Continue reading</a>
                            </div>
                            <div className="col-auto d-none d-lg-block">
                                <img className="bd-placeholder-img img-thumbnail" width={180} height={180} src="https://i1-giaitri.vnecdn.net/2022/09/16/-8853-1663309854.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=rSmfiRRXkNYj5g-8qq21Yg" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 news-list">
                        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                                <strong className="d-inline-block mb-2 text-success">Nổi bật</strong>
                                <h3 className="mb-0">10 vai diễn làm nên tên tuổi -
                                    Timothée Chalamet </h3>
                                <div className="mb-1 text-muted">Nov 12</div>
                                <p className="card-text mb-auto">Tài tử Christian Bale được mệnh danh "tắc kè hoa" .</p>
                                <a href="#" className="stretched-link">Continue reading</a>
                            </div>
                            <div className="col-auto d-none d-lg-block">
                                <img className="bd-placeholder-img img-thumbnail" width={180} height={180} src="https://i1-giaitri.vnecdn.net/2022/09/16/-8853-1663309854.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=rSmfiRRXkNYj5g-8qq21Yg" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row g-5">
                    <div className="col-md-8">
                        <h3 className="pb-4 mb-4 fst-italic border-bottom">
                            Từ Firehose
                        </h3>
                        <article className="blog-post">
                            <h2 className="blog-post-title">Bài đăng trên blog</h2>
                            <p className="blog-post-meta">ngày 1 tháng 9, 2022 Từ <a href="#">Thùy Tiên</a></p>
                            <p className="my-3">"Terminator Salvation" (2009): Khi đang thành công với loạt phim về Batman, Bale
                                nhận lời tham dự
                                một bom tấn hành động, vào vai John Connor chống lại lũ robot đe dọa Trái Đất. Dự án thể hiện
                                một hình rất khác của anh, xả thân trong bùn lầy và thực hiện các phân đoạn hành động thay vì
                                diễn các cảnh tâm lý.</p>
                            <hr />
                            <img width="100% mx-auto" src="https://i1-giaitri.vnecdn.net/2022/10/11/Best-Chritian-Bale-films-0011-Out-of-the-furnace-MCDOUOF-EC148-1665458493.jpg?w=1200&h=0&q=100&dpr=2&fit=crop&s=grzd5zFlh1HDnDIsRbUHnQ" />
                            <p className="my-3">Christian Bale là gương mặt trang bìa của tờ GQ trong số tháng 11 sắp ra mắt. Nhân
                                dịp này, tạp chí điểm lại 10 dự án tiêu biểu nhất trong sự nghiệp của anh. Số một là vai siêu
                                anh hùng Batman trong loạt phim của đạo diễn Christopher Nolan.
                                "The Dark Knight" (2008): Bale hóa thân Bruce Wayne từ công tử trẻ tuổi đến hiệp sĩ giấu mặt
                                chuyên trừng phạt lũ tội phạm tại Gotham. Trong phần đầu, anh toát lên vẻ quyến rũ và quyền quý
                                của người thừa kế nhà Wayne. Phần hai, nhân vật trở nên khéo léo, tinh quái. Đến tập cuối,
                                Batman của Bale lộ những mệt mỏi, tổn thương sau nhiều năm làm siêu anh hùng.</p>
                            <h2>"The Dark Knight" (2008)</h2>
                            <p>TBale hóa thân Bruce Wayne</p>
                            <p>từ công tử trẻ tuổi đến hiệp sĩ giấu mặt chuyên trừng phạt lũ tội phạm tại Gotham. Trong phần
                                đầu, anh toát lên vẻ quyến rũ và quyền quý của người thừa kế nhà Wayne. Phần hai, nhân vật trở
                                nên khéo léo, tinh quái. Đến tập cuối, Batman của Bale lộ những mệt mỏi, tổn thương sau nhiều
                                năm làm siêu anh hùng.
                                Trong đó, phần hai "The Dark Knight" được đánh giá cao hơn cả. Bale thể hiện nhân vật bên cạnh
                                đồng nghiệp Heath Ledger - người có màn hóa thân phản diện Joker nhận giải Oscar.</p>
                            <img width="100% mx-auto" src="https://i1-giaitri.vnecdn.net/2022/10/11/Best-Chritian-Bale-films-0003-Ford-v-Ferrari-MCDFOVV-EC002-1665458490.jpg?w=1200&h=0&q=100&dpr=2&fit=crop&s=qPR5V3bI_CqqaasNDXWYNg" />
                            <p>Diễn viên thành tâm điểm buổi ra mắt Bones and All ở Liên hoan phim Venice đầu tháng 9 với chiếc
                                áo hở lưng, lấy cảm hứng từ bộ sưu tập Xuân 2018 của Ackermann dành cho nữ. Trang Independent
                                nhận xét: "Không ai có thể quên hình ảnh của anh ấy. Timothée Chalamet đã thách thức định kiến
                                của xã hội về những gì đàn ông nên mặc". Tờ GQ đánh giá bộ đồ phá bỏ những ràng buộc và quy ước
                                thời trang của nam giới trong ngành công nghiệp điện ảnh.</p>
                            <p className="my-2">Không chỉ trong thời trang, ngôi sao 26 tuổi được đánh giá đang tạo nên hình tượng
                                nam tính mới trên màn ảnh. Khi nhắc tới nam tính, mọi người thường nghĩ đến một người cao lớn,
                                vạm vỡ hay quý ông lịch lãm trong bộ suit. Theo Guardian, trong lịch sử điện ảnh, nhân vật như
                                James Bond (Điệp viên 007) đã trở thành hình mẫu của đàn ông. Ở các bộ phim Hollywood ngày nay,
                                hình tượng đó có thể kể đến Captain America (Chris Evans), Tommy Shelby (Cillian Murphy) hay
                                Superman (Henry Cavill). Họ đều có cơ thể cường tráng, khỏe khoắn với những nét tính cách tiêu
                                biểu như quyết đoán, mạnh mẽ, tự lập.
                                Timothée Chalamet hoàn toàn khác - chinh phục Hollywood bằng thân hình mảnh mai, mái tóc xoăn
                                bồng bềnh, khí chất thanh tao của chàng trai mang một nửa dòng máu Pháp.</p>
                        </article></div>
                    <div className="col-md-4">
                        <div className="position-sticky" style={{ top: '2rem' }}>
                            <div className="p-4 mb-3 bg-light rounded">
                                <h4 className="fst-italic">Biểu tượng Ciné</h4>
                                <p className="mb-0">Timothée Chalamet - với thân hình mảnh mai, đôi mắt ướt - thường đóng những nhân vật nam sống nội tâm.</p>
                            </div>
                            <div className="p-4">
                                <h4 className="fst-italic">Tin tức </h4>
                                <ol className="list-unstyled mb-0">
                                    <li><a href="#">December 2022</a></li>
                                    <li><a href="#">November 2022</a></li>
                                    <li><a href="#">October 2022</a></li>
                                    <li><a href="#">September 2022</a></li>
                                    <li><a href="#">August 2022</a></li>
                                    <li><a href="#">July 2022</a></li>
                                    <li><a href="#">June 2022</a></li>
                                    <li><a href="#">May 2022</a></li>
                                    <li><a href="#">April 2022</a></li>
                                </ol>
                            </div>
                            <div className="p-4">
                                <h4 className="fst-italic">Kết nối với chúng tôi</h4>
                                <ol className="list-unstyled">
                                    <li><a href="#">Gmail</a></li>
                                    <li><a href="#">Twitter</a></li>
                                    <li><a href="#">Facebook</a></li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>

    )
}

export default News