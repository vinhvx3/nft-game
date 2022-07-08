import React from "react";

function DocumentScreen(props) {
  return (
    <div id="document-screen">
      <div className="background"></div>
      <div className="content">
        <h1>Hướng dẫn</h1>
        <div className="description">
          - Người chơi cần phải mở khóa để nhận được thú nuôi.
          <br /> - Mỗi thú nuôi đều thuộc một hệ nguyên tố khác nhau, lần lượt
          khắc chế nhau theo thứ tự Thủy &gt;&gt; Hỏa, Hỏa &gt;&gt; Điện, Điện
          &gt;&gt; Thủy.
          <br /> - Các thú cần được cho ăn hàng ngày để tích lũy kinh nghiệm.
          <br /> - Có thễ dẫn thú đi làm nhiệm vụ để nhận được kinh nghiệm.
          <br /> - Kinh nghiệm dùng để nâng cấp thú, giúp tăng các chỉ số tấn
          công, phòng thủ.
        </div>
      </div>
    </div>
  );
}

export default DocumentScreen;
