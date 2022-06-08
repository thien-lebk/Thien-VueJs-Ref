<template>
  <v-container fluid class="container-repayment-preview">
    <v-layout align-start justify-start row>
      <v-flex xs8>
        <div id="print" style="font-size: 12px; font-family: 'Times New Roman'">
          <div style="padding-left:20px; padding-right:20px;">
            <v-card color="#ffffff" class="box-preview-left" flat>
              <v-layout align-center justify-center column>
                <h4>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h4>
                <div style="border: 1px solid #BFBFBF !important; width: 100%; margin: 10px 5px;"></div>
                <h5>Độc lập - Tự do - Hạnh phúc</h5>
              </v-layout>
              <br/>
              <v-layout align-start justify-start row class="body-container">
                <v-flex xs3>
                  <img src="../../assets/camdo-logo.jpg" alt="logo" height="111" width="111">
                </v-flex>
                <v-flex xs9>
                  <p style="padding-left: 65px;"><font size="5"><b style="text-align: -webkit-center;">HỢP ĐỒNG CẦM CỐ</b></font></p>
                  <strong>Mã hợp đồng(HĐ): {{currentBranch}} - {{oldLoanId}} - {{loanId}}</strong><br>
                  <strong>Mã khách hàng(KH): HCMKH-{{clientId}}</strong><br>
                </v-flex>
              </v-layout>
              <br/><br/>
              <p>Ngày {{transactionDate}}, Tại Công ty TNHH Đầu tư và Phát Triển Kinh Doanh ICADO, Chúng tôi gồm có:</p>
            
              <v-layout>
                <v-flex xs6>
                  <strong>Bên khách hàng:</strong>

                  <v-layout>
                      <v-flex xs5>
                          Họ và tên:
                      </v-flex>
                      <v-flex xs7>
                          {{customerName}}
                      </v-flex>
                  </v-layout>

                  <v-layout>
                      <v-flex xs5>
                          ĐTDĐ:
                      </v-flex>
                      <v-flex xs7>
                          {{phoneNumber}}
                      </v-flex>
                  </v-layout>

                  <v-layout>
                      <v-flex xs5>
                          Sinh ngày:
                      </v-flex>
                      <v-flex xs7>
                          {{birthDay}}
                      </v-flex>
                  </v-layout>

                  <v-layout>
                      <v-flex xs5>
                          CMND:
                      </v-flex>
                      <v-flex xs7>
                          {{nationalId}}
                      </v-flex>
                  </v-layout>

                  <template v-if="contractType ==='Realestate' && (anotherCustomerName.length > 0 || anotherNationalId.length > 0)">
                    <v-layout>
                      <v-flex xs5>
                          Họ&Tên Vợ/Chồng:
                      </v-flex>
                      <v-flex xs7>
                          {{anotherCustomerName}}
                      </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex xs5>
                            CMND:
                        </v-flex>
                        <v-flex xs7>
                            {{anotherNationalId}}
                        </v-flex>
                    </v-layout>
                  </template>

                  <v-layout>
                      <v-flex xs5>
                          Địa chỉ:
                      </v-flex>
                      <v-flex xs7>
                          {{address}}
                      </v-flex>
                  </v-layout>

                </v-flex>

                <v-flex sm6>
                    <strong>Bên nhận cầm cố tài sản:</strong>
                    <br/>
                    Công ty TNHH Đầu Tư và Phát Triển Kinh Doanh ICADO
                    <br/>
                    GPKD số: 0313412428
                    <br/>
                    Địa chỉ: {{currentBranchAddress}}
                </v-flex>
              </v-layout>

              <br v-if="address.length < 30"/><br/>

              <strong>Hai bên đồng ý thực hiện việc cầm cố tài sản với những thoả thuận sau:</strong>
              <br/>
              <strong>I. THOẢ THUẬN VỀ ĐỊNH GIÁ TÀI SẢN</strong>
              <br/>
              <strong>1. Thông tin tài sản cầm cố (TSCC):</strong>
              <br/>
              <br/>
              <br/>
              <ul>
                <table style="padding-left:27px;">
                  <tr>
                      <td>
                          <li>Tài sản cầm cố:</li>
                      </td>
                      <td>
                          {{asset}}
                      </td>
                  </tr>
                  <tr>
                      <td>
                          <li>Miêu tả tài sản:</li>
                      </td>
                      <td>
                          {{description}}
                      </td>
                  </tr>
                  <tr>
                      <td style="padding-right:30px; white-space:nowrap;">
                          <li>Linh kiện/phụ kiện:</li>
                      </td>
                      <td>
                          {{accessory}}
                      </td>
                  </tr>
                  <tr v-if="contractType !== 'Realestate'">
                      <td>
                          <li>Số lượng:</li>
                      </td>
                      <td>
                          01
                      </td>
                  </tr>
                  <tr v-else>
                      <td>
                          <li>ĐK cầm đất:</li>
                      </td>
                      <td>
                          Khách hàng xác nhận tài sản chưa từng phát sinh giao dịch mua bán bằng giấy tay với bất kì bên nào.
                      </td>
                  </tr>
                </table>
              </ul>
              <strong>2. Điều kiện cầm:</strong>
              <br/>
              <br/>
              <br/>
              <ul>
                <table style="padding-left:27px;">
                  <tr>
                      <td>
                          <li>Giá cầm:</li>
                      </td>
                      <td>
                          <strong>{{formatedApprovedAmount}} VNĐ</strong>
                      </td>
                  </tr>
                  <tr>
                      <td>
                          <li>Ngày hết hạn:</li>
                      </td>
                      <td>
                          <strong>{{expirationDate}}</strong>
                      </td>
                  </tr>
                  <tr>
                      <td style="padding-right:30px; white-space:nowrap;">
                          <li>Lãi suất trong hạn:</li>
                      </td>
                      <td>
                          <strong>1.5 %</strong>
                      </td>
                  </tr>
                  <tr>
                      <td>
                          <li>Phí dịch vụ:</li>
                      </td>
                      <td>
                          <strong>{{interestRate - 1.5}} %</strong>
                      </td>
                  </tr>
                </table>
              </ul>
              <br/><br/><br/>
              <span>
                ICADO sẽ giải ngân bằng tiền mặt cho KH là <strong>{{formatedCost}} VNĐ </strong> {{interestTypeContent1}} <strong>{{formatedInterestMoney}} VNĐ</strong>{{interestTypeContent2}} 
                <strong>Tôi xác nhận rằng:</strong> <i> Tôi đã đọc, hiểu và cam kết tuân thủ theo quy định về quy trình gia hạn hợp đồng mới, quy trình
                nhắc lãi, quy trình thẩm định thanh lý tài sản. Trong trường hợp tôi vi phạm những quy định trên, Tôi xin chịu hoàn
                toàn trách nhiệm về sai phạm của mình. </i>
              </span>
              <br/><br/><br/><br/><br/><br/>
              <v-layout>
                  <v-flex sm6>
                    <center>
                      Đại diện ICADO
                      <br/>
                      (Ký, ghi rõ họ tên và đóng dấu)
                    </center>
                  </v-flex>
                  <v-flex sm6>
                    <center>
                      Khách hàng
                      <br/>
                      (Ký, ghi rõ họ tên)
                    </center>
                  </v-flex>
              </v-layout>
              <br/><br/><br/><br/>
            
              <br v-if="description.length <= 62"/>
              <br v-if="description.length <= 125"/>

              <template v-if="contractType !=='Realestate' || (anotherCustomerName.length == 0 && anotherNationalId.length == 0)">
                <br/>
                <br/>
              </template>
              <br/><br/><br/><br/>
              <center>
                <img src="../../assets/time.png" alt="FOOTER" height="37" width="753" />
              </center>
              <br/>
              <strong>II. ĐIỀU KHOẢN CẦM ĐỒ</strong>
              <p>Quý khách vui lòng đọc kỹ các quy định dưới đây trước khi kí HĐ:</p>
              <br/>
              <strong>1. Các điều khoản về thời hạn, tất toán và gia hạn HĐ</strong>
              <span>
                <ul style="list-style-type: circle;">
                  <li>HĐ này có giá trị trong vòng {{period}}. Hết {{period}}, khách hàng có quyền tất toán hoặc gia hạn HĐ</li>
                  <li>Trong trường hợp gia hạn, khách hàng sẽ tiến hành đóng lãi theo quy định của ICADO.</li>
                  <li>Trong trường hợp KH gia hạn HĐ, ICADO sẽ thẩm định lại giá trị TSCC theo giá trị tài sản thực tế tại thời điểm gia hạn. Trong trường hợp KH muốn gia hạn mà giá trị tài sản tại thời điểm gia hạn mất giá trị quá 10% thì KH sẽ tiến hành đóng lãi cộng thêm khoản chênh lệch để được tiếp tục gia hạn HĐ.</li>
                  <li>Trong trường hợp ICADO và KH đồng ý thỏa thuận, việc gia hạn có thể được thực hiện dưới 2 hình thức:</li>
                  <ul style="list-style-type: square;">
                    <li>KH đến trực tiếp công ty làm thủ tục.</li>
                    <li>KH thực hiện chuyển khoản tiền lãi (thêm khoản chênh lệch nếu có) cộng với xác nhận email/tin nhắn. ICADO sẽ xác nhận gia hạn qua email/tin nhắn.</li>
                  </ul>
                  <li>KH có thể đóng lãi, tất toán HĐ bằng tiền mặt tại văn phòng hoặc chuyển khoản qua thông tin dưới đây:</li>
                  <br/>
                  <center>
                    <table style="width: 478px; border: 1px solid black; border-collapse: collapse;">
                        <tr>
                          <td style="border: 1px solid black; border-collapse: collapse;" align="left" colspan="2"><font size="2">&nbsp; Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)</font></td>
                        </tr>
                      <tr>
                        <td style="border: 1px solid black; border-collapse: collapse;" align="left"><font size="2">&nbsp; Chủ tài khoản:</font></td>
                        <td style="border: 1px solid black; border-collapse: collapse;" align="left"><font size="2">&nbsp; Công ty TNHH Đầu tư và Phát triển kinh doanh ICADO</font></td>
                      </tr>
                      <tr>
                        <td style="border: 1px solid black; border-collapse: collapse;" align="left"><font size="2">&nbsp; Số tài khoản:</font></td>
                        <td style="border: 1px solid black; border-collapse: collapse;" align="left"><font size="2">&nbsp; 0071001173304</font></td>
                      </tr>
                      <tr align="left" valign="middle">
                        <td style="border: 1px solid black; border-collapse: collapse;" align="left" colspan="4"><font size="2">&nbsp; Nội dung: Đóng lãi/tất toán HĐ số..................</font></td>
                      </tr>
                    </table>
                  </center>
                  <br/>
                </ul>
                <strong>2. Các điều khoản liên quan đến tiền lãi</strong>
                <ul style="list-style-type: circle;">
                  <li>Trường hợp KH đóng lãi hoặc tất toán trễ tính từ ngày hết hạn cầm đồ, ICADO sẽ thu thêm tiền lãi ngày theo quy định</li>
                  <li>Trường hợp KH tất toán trước thời hạn cầm, ICADO không hoàn trả lại khoản lãi đã thu trước đó.</li>
                </ul>
                <br/>
                <strong>3. Thanh lý tài sản</strong>
                <ul style="list-style-type: circle;">
                  <li>Sau 3 ngày kể từ ngày hết hạn cầm cố, nếu KH không hoàn thành nghĩa vụ tất toán HĐ hoặc đóng lãi gia hạn theo Điều 1 của HĐ này, ICADO có quyền nhận chính TSCC để thay thế cho việc thực hiện nghĩa vụ trả nợ của KH.</li>
                  <li>Kể từ thời điểm trên, ICADO sẽ có toàn quyền sở hữu và được phép thanh lý TSCC theo quy định nội bộ, đồng thời yêu cầu KH thanh toán số nợ còn thiếu nếu số tiền thu được từ việc thanh lý TSCC không đủ bù đắp vốn đã cho cầm và các chi phí liên quan đến việc thanh lý TSCC của KH.</li>
                </ul>
                <br/>
                <strong>4. Cam kết về nguồn gốc tài sản</strong>
                <ul style="list-style-type: circle;">
                  <li>KH phải cam kết chịu trách nhiệm hoàn toàn về nguồn gốc hợp pháp của TSCC, cam kết về tính chính hãng, nguyên gốc của TSCC. Trường hợp phát sinh bất kì tranh chấp, khiếu nạn liên quan đến TSCC thì KH có trách nhiệm giải quyết, đồng thời phải hoàn thành nghĩa vụ theo HĐ này và bồi thường
                    từ ICADO toàn bộ chi phí thiệt hại phát sinh.
                  </li>
                  <li>KH phải cam kết về tính chính hãng, nguyên gốc của TSCC. Trong trường hợp phát hiện TSCC giả mạo, KH phải chịu trách nhiệm hoàn toàn trước pháp luật đồng thời bồi thường cho ICADO toàn bộ chi phí thiệt hại phát sinh</li>
                </ul>
                <br/>
                <strong>5. Quy định về tất toán HĐ</strong>
                <ul style="list-style-type: circle;">
                  <li>Chỉ người đứng tên trên HĐ mới có quyền nhận lại TSCC (mang theo cả giấy CMND và HĐ cầm cố).</li>
                  <li>ICADO sẽ bàn giao tài sản còn nguyên tem niêm phong với chữ ký khi KH hoàn tất việc thanh toán tiền gốc và lãi theo HĐ. KH cần thực hiện việc tháo dỡ tem và kiểm tra lại tài sản khi có sự hiện diện của nhân viên công ty. Mọi hư hỏng sau khi tài sản được bàn giao cho KH, ICADO sẽ không chịu trách nhiệm.</li>
                  <li>Trường hợp tài sản bị tổn thất do lâu không được sử dụng, ICADO sẽ không chịu trách nhiệm bồi thường.</li>
                </ul>
                <strong>6. Các quy định khác</strong>
                <ul style="list-style-type: circle;">
                  <li>Trong trường hợp bị thất lạc, mất mát hoặc hư hại HĐ, KH có trách nhiệm thông báo ngay cho ICADO, chúng tôi sẽ không chịu trách nhiệm với bất kỳ tổn thất nào về tài sản của quý khách khi không xuất trình được HĐ.</li>
                  <li>Trong trường hợp ICADO cần mở niêm phong TSCC để kiểm tra ngẫu nhiên tài sản theo quy định của công ty, KH hỗ trợ hiện diện có mặt để đảm bảo việc niêm phong minh bạch.</li>
                  <li>Trong trường hợp TSCC bị tổn hại do lỗi bên ICADO, công ty sẽ có trách nhiệm bồi thường cho KH theo thỏa thuận của hai bên</li>
                  <li v-if="contractType == 'Realestate'">Trong thời gian cầm cố tài sản, nếu KH hoàn thành đúng nghĩa vụ gia hạn HD. ICADO không có quyền đăng bộ tài sản cầm cố được nêu trong Mục I của HD này.</li>
                </ul>
              </span>
            </v-card>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <v-card color="#ffffff" class="box-preview-left" flat>
              <v-layout align-center justify-center column>
                <h4>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h4>
                <div style="border: 1px solid #BFBFBF !important; width: 100%; margin: 10px 5px;"></div>
                <h5>Độc lập - Tự do - Hạnh phúc</h5>
              </v-layout>
              <br/>
              <v-layout align-start justify-start row class="body-container">
                <v-flex xs3>
                  <img src="../../assets/camdo-logo.jpg" alt="logo" height="111" width="111">
                </v-flex>
                <v-flex xs9>
                  <p style="padding-left: 75px;"><font size="5"><b style="text-align: -webkit-center;">PHIẾU THU TIỀN</b></font></p>
                  <strong>Mã hợp đồng(HĐ): {{currentBranch}} - {{oldLoanId}} - {{loanId}}</strong><br>
                  <strong>Mã khách hàng(KH): HCMKH-{{clientId}}</strong><br>
                </v-flex>
              </v-layout>
              <br/>
              <table>
                  <tr>
                    <td>Ngày lập phiếu:</td>
                    <td><span style="margin-left: 100px;">{{transactionDate}} {{time}}</span></td>
                  </tr>
                  <tr>
                    <td><strong>Họ và tên(KH):</strong></td>
                    <td><strong style="margin-left: 100px;">{{customerName}}</strong></td>
                  </tr>
                  <tr>
                    <td>Số điện thoại:</td>
                    <td><span style="margin-left: 100px;">{{phoneNumber}}</span></td>
                  </tr>
                  <tr>
                    <td>Địa chỉ:</td>
                    <td><span style="margin-left: 100px;">{{address}}</span></td>
                  </tr>
                  <tr>
                    <td><strong>Lý do:</strong></td>
                    <td><strong style="margin-left: 100px;">Đóng HD {{oldLoanId}}, mở HĐ {{loanId}} ({{transactionDate}}/{{expirationDate}})</strong></td>
                  </tr>
                  <tr>
                      <td><strong>Phương thức TT:</strong></td>
                      <td><strong style="margin-left: 100px;">{{method}}</strong></td>
                    </tr>
                  <tr>
                    <td><strong>Tổng tiền:</strong></td>
                    <td><strong style="margin-left: 100px;">{{formatedTotalInterestMoney}} VNĐ</strong></td>
                  </tr>
                  <template v-if="interestDiscount !== 0">
                    <tr>
                      <td><strong>Giảm giá:</strong></td>
                      <td><strong style="margin-left: 100px;">{{formatedInterestDiscount}} VNĐ</strong></td>
                    </tr>
                    <tr>
                      <td><strong>Tiền thu:</strong></td>
                      <td><strong style="margin-left: 100px;">{{formatedInterestMoney}} VNĐ</strong></td>
                    </tr>
                  </template>
              </table>
              <br/>
              <v-layout align-start justify-center row class="sign-class">
                <v-flex xs6 >
                  <center>
                    <strong>Người nộp tiền</strong><br>
                    <strong>(Ký, và ghi họ tên)</strong>
                  </center>
                </v-flex>
                <v-flex xs6>
                  <center>
                    <strong>Người lập phiếu</strong><br>
                    <strong>(Ký, và ghi họ tên)</strong>
                  </center>
                </v-flex>
              </v-layout>
              <br/><br/><br/><br/><br/><br/><hr/><br/><br/><br/><br/>
    
              <v-layout align-center justify-center column wrap>
                <h4>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h4>
                <div style="border: 1px solid #BFBFBF !important; width: 100%; margin: 10px 5px;"></div>
                <h5>Độc lập - Tự do - Hạnh phúc</h5>
              </v-layout>
              <br/>
              <v-layout flat align-start justify-start row class="body-container">
                <v-flex xs3>
                  <img src="../../assets/camdo-logo.jpg" alt="logo" height="111" width="111">
                </v-flex>
                <v-flex xs9>
                  <p style="padding-left: 75px;"><font size="5"><b style="text-align: -webkit-center;">PHIẾU THU TIỀN</b></font></p>
                  <strong>Mã hợp đồng(HĐ): {{currentBranch}} - {{oldLoanId}} - {{loanId}}</strong><br>
                  <strong>Mã khách hàng(KH): HCMKH1000-{{clientId}}</strong><br>
                </v-flex>
              </v-layout>
              <br/>
              <table>
                <tr>
                  <td>Ngày lập phiếu:</td>
                  <td><span style="margin-left: 100px;">{{transactionDate}} {{time}}</span></td>
                </tr>
                <tr>
                  <td><strong>Họ và tên(KH):</strong></td>
                  <td><strong style="margin-left: 100px;">{{customerName}}</strong></td>
                </tr>
                <tr>
                  <td>Số điện thoại:</td>
                  <td><span style="margin-left: 100px;">{{phoneNumber}}</span></td>
                </tr>
                <tr>
                  <td>Địa chỉ:</td>
                  <td><span style="margin-left: 100px;">{{address}}</span></td>
                </tr>
                <tr>
                  <td><strong>Lý do:</strong></td>
                  <td><strong style="margin-left: 100px;">Đóng HD {{oldLoanId}}, mở HĐ {{loanId}} ({{transactionDate}}/{{expirationDate}})</strong></td>
                </tr>
                <tr>
                  <td><strong>Phương thức TT:</strong></td>
                  <td><strong style="margin-left: 100px;">{{method}}</strong></td>
                </tr>
                <tr>
                  <td><strong>Tổng tiền:</strong></td>
                  <td><strong style="margin-left: 100px;">{{formatedTotalInterestMoney}} VNĐ</strong></td>
                </tr>
                <template v-if="interestDiscount !== 0">
                  <tr>
                    <td><strong>Giảm giá:</strong></td>
                    <td><strong style="margin-left: 100px;">{{formatedInterestDiscount}} VNĐ</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Tiền thu:</strong></td>
                    <td><strong style="margin-left: 100px;">{{formatedInterestMoney}} VNĐ</strong></td>
                  </tr>
                </template>
              </table>
              <br/>
              <v-layout wrap align-start justify-center row class="sign-class">
                <v-flex xs6 >
                  <center>
                    <strong>Người nộp tiền</strong><br>
                    <strong>(Ký, và ghi họ tên)</strong>
                  </center>
                </v-flex>
                <v-flex xs6>
                  <center>
                    <strong>Người lập phiếu</strong><br>
                    <strong>(Ký, và ghi họ tên)</strong>
                  </center>
                </v-flex>
              </v-layout>
            </v-card>
          </div>
        </div>
      </v-flex>
      <v-flex xs4 class="box-preview-right">
        <v-card class="body-container">
          <strong>VUI LÒNG KIỂM TRA SỐ TIỀN</strong><br>
          <strong> VÀ IN PHIẾU THU</strong>
          <v-layout align-center justify-center row class="button">
            <v-btn v-if="!created" :disabled="created" round class="btn-back" @click="backHandle">
              Back
            </v-btn>
            <v-btn v-else round class="btn-back" @click="cancelHandle">
              Cancel
            </v-btn>
            <v-btn  fab dark small class="mx-2 btn-print" @click="printHandle" :loading="contractCreatingRequest">
              <i class="material-icons">print</i>
            </v-btn>
            <v-btn round :disabled="!printed || !created" @click="endHandle" class="btn-confirm" >
              End
            </v-btn>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import {mapGetters} from 'vuex'
import moment from 'moment'

export default {
  name: "contract-extent-preview",
  components: {
  },
  data: () => ({
    loanId: 'XXXX',
    printed: false,
    time: 'XXXX',
  }),
  props: {
    contractType: String,
    customerName: String,
    oldLoanId: String,
    phoneNumber: String,
    birthDay: String,
    nationalId: String,
    address: String,
    asset: String,
    description: String,
    accessory: String,
    method: String,
    approvedAmount: Number,
    transactionDate: String,
    expirationDate: String,
    interestRate: Number,
    repayEvery: Number,
    owed: Number,
    clientId: String,
    fee: Number,
    productName: String,
    cost: Number,
    interestValue: Number,
    interestDiscount: Number,
  },
  watch: {
    created() {
      if (this.created === true) {
        this.loanId = this.contractCreatingResult.loanId
        this.time = moment().format("HH:mm:ss")
        setTimeout(() => {this.printHandle()}, 1000) 
      }
    },
  },
  computed: {
    ...mapGetters({
      currentBranch: 'branch/currentBranch',
      currentBranchAddress: 'branch/currentBranchAddress',
      contractCreatingRequest: 'contract/contractCreatingRequest',
      contractCreatingResult: 'contract/contractCreatingResult',
      contractCreatingErrorCode: 'contract/contractCreatingErrorCode',
    }),
    created() {
      if (this.contractCreatingErrorCode === 201) {
        return true
      }
      return false
    },
    period() {
      try {
        if (this.repayEvery === 30) {
          return '1 Tháng'
        }
        return `${this.repayEvery} Ngày`
      } catch (error) {
        return ''
      }
    },
    formatedApprovedAmount() {
      return this.formatMoney(this.approvedAmount * 1000000)
    },
    formatedOwedAmount() {
      return this.formatMoney((this.owed - this.fee) * 1000000)
    },
    formatedCost() {
      return this.formatMoney(this.cost * 1000000)
    },
    formatedTotalInterestMoney() {
      return this.formatMoney((this.interestValue + this.interestDiscount) * 1000000)
    },
    formatedInterestMoney() {
      return this.formatMoney(this.interestValue * 1000000)
    },
    formatedInterestDiscount() {
      return this.formatMoney(this.interestDiscount * 1000000)
    },
    interestTypeContent1() {
      if (this.productName.includes('Prepaid Interest')) {
        return "đã khấu trừ tiền lãi suất đầu kỳ là"
      }
      return "và sẽ thu tiền lãi suất mỗi kỳ là"
    },
    interestTypeContent2() {
      if (this.productName.includes('Prepaid Interest')) {
        return "."
      }
      return " vào ngày hết hạn hợp đồng."
    },
  },
  methods: {
    backHandle() {
      this.$emit('back')
    },
    cancelHandle() {
      this.$emit('cancel')
    },
    printHandle() {
      if (!this.created) {
       this.$emit('create')
      } else {
        this.$htmlToPaper('print', () => {
          this.printed = true
        })
      }
    },
    endHandle() {
      this.$emit('end')
    },
    formatMoney(money) {
      return money.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace('.0', '')
    },
  },
}
</script>
<style>
.container-repayment-preview {
  padding: 0px !important;
}
.box-preview-left {
  padding: 50px !important;
  font-size: 13px;
}

.logo-img {
  width:80px;
  height:75px;
  margin-left: 5px;
}

.titel-repayment-name {
  width: 100%;
  text-align: center;
}

.titel-repayment-name h1 {
  margin-left: -100px;
}

.box-preview-left .body-container {
  margin-top: 20px;
}

.sign-class {
  margin-top: 20px;
  text-align: center;
}

.sign-class .sign-customer strong {
  margin-left: -100px;
}

.toolbar {
  margin-top: 120px;
}

.box-preview-right {
  padding-left: 30px;
  text-align: center;
}

.box-preview-right .body-container {
  padding: 20px;
}

.button button {
  margin-right: 5px;
  font-size: 0.9vw !important;
  color: #ffffff !important;
  text-transform: capitalize !important;
}

.button .btn-print {
  background-color: #43425D !important;
  min-width: 2vw !important;
  border-radius: 50% !important;
}

.button .btn-back {
  background-color: #FFFFFF !important;
  color: #DD1E26 !important;
  min-width: 4vw !important;
}

.button .btn-back:focus {
  background-color: #EAE5E5 !important;
}

.button .btn-confirm {
  background-color: #DD1E26 !important;
  color: #FFFFFF;
}

.button .btn-confirm:hover {
  background-color: #E84D4D !important;
}
</style>