<template>
  <v-container fluid class="container-repayment-preview">
    <v-layout align-start justify-start row>
      <v-card id="print" color="#ffffff" class="box-preview-left" style="font-size: 12px;">
        <div style="padding-left:20px; padding-right:20px;">
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
              <strong>Mã hợp đồng(HĐ): {{branchName}} - {{loanId}}</strong><br>
              <strong>Mã khách hàng(KH): HCMKH-{{clientId}}</strong><br>
            </v-flex>
          </v-layout>
          <br/>
          <p>Ngày {{maturesDate}}, Tại Công ty TNHH Đầu tư và Phát Triển Kinh Doanh ICADO, Chúng tôi gồm có:</p>
        
          <v-layout>
            <v-flex xs6>
              <strong>Bên khách hàng:</strong>

              <v-layout>
                  <v-flex xs5>
                      Họ và tên:
                  </v-flex>
                  <v-flex xs7>
                      {{clientName}}
                  </v-flex>
              </v-layout>

              <v-layout>
                  <v-flex xs5>
                      ĐTDĐ:
                  </v-flex>
                  <v-flex xs7>
                      {{phone}}
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
                      {{fulladdress}}
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
                Địa chỉ: {{branchAddress}}
            </v-flex>
          </v-layout>

          <br v-if="fulladdress.length < 30"/><br/>

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
                      <strong>{{dueDate}}</strong>
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
                      <strong>{{fee}} %</strong>
                  </td>
              </tr>
            </table>
          </ul>
          <br/><br/><br/>
          <span>
            ICADO sẽ giải ngân bằng tiền mặt cho KH là <strong>{{formatedReceivedAmount}} VNĐ </strong> {{interestTypeContent1}} <strong>{{formatedInterestMoneyHint}} VNĐ</strong>{{interestTypeContent2}} 
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
          <br/><br/><br/><br/><br/><br/><br/>

          <br v-if="description.length <= 62"/>
          <br v-if="description.length <= 125"/>

          <template v-if="contractType !=='Realestate' || (anotherCustomerName.length == 0 && anotherNationalId.length == 0)">
            <br/>
            <br/>
          </template>
          <br/><br/>
          <center>
            <img src="../../assets/time.png" alt="FOOTER" height="37" width="753" />
          </center>
          <br/>
          <strong>II. ĐIỀU KHOẢN CẦM ĐỒ</strong>
          <p>Quý khách vui lòng đọc kỹ các quy định dưới đây trước khi kí HĐ:</p>
          <br/>
          <span>
            <strong>1. Các điều khoản về thời hạn, tất toán và gia hạn HĐ</strong>
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
              <li>KH phải cam kết chịu trách nhiệm hoàn toàn về nguồn gốc hợp pháp của TSCC, cam kết về tính chính hãng, nguyên gốc của TSCC. Trường hợp phát sinh bất kì tranh chấp, khiếu nạn liên quan đến TSCC thì KH có trách nhiệm giải quyết, đồng thời phải hoàn thành nghĩa vụ theo HĐ này và bồ thường
                chi ICADO toàn bộ chi phí thiệt hại phát sinh.
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
            <br/>
            <strong>6. Các quy định khác</strong>
            <ul style="list-style-type: circle;">
              <li>Trong trường hợp bị thất lạc, mất mát hoặc hư hại HĐ, KH có trách nhiệm thông báo ngay cho ICADO, chúng tôi sẽ không chịu trách nhiệm với bất kỳ tổn thất nào về tài sản của quý khách khi không xuất trình được HĐ.</li>
              <li>Trong trường hợp ICADO cần mở niêm phong TSCC để kiểm tra ngẫu nhiên tài sản theo quy định của công ty, KH hỗ trợ hiện diện có mặt để đảm bảo việc niêm phong minh bạch.</li>
              <li>Trong trường hợp TSCC bị tổn hại do lỗi bên ICADO, công ty sẽ có trách nhiệm bồi thường cho KH theo thỏa thuận của hai bên</li>
              <li v-if="contractType == 'Realestate'">Trong thời gian cầm cố tài sản, nếu KH hoàn thành đúng nghĩa vụ gia hạn HD. ICADO không có quyền đăng bộ tài sản cầm cố được nêu trong Mục I của HD này.</li>
            </ul>
          </span>

          <div v-if="contractType==='Bike/Car'">
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
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
                <p style="padding-left: 101px; margin-bottom: 0px;"><font size="5"><b style="text-align: -webkit-center;">Giấy Uỷ Quyền</b></font></p>
                <p style="padding-left: 104px;"><font size="5"><b style="text-align: -webkit-center;">XE MÁY/Ô TÔ</b></font></p>
              </v-flex>
            </v-layout>
            <br/>
            <p>Ngày {{maturesDate}}, Tại Công ty TNHH Đầu tư và Phát Triển Kinh Doanh ICADO, Chúng tôi gồm có:</p>
          
            <v-layout>
              <v-flex xs6>
                <strong>BÊN UỶ QUYỀN (BÊN A):</strong>

                <v-layout>
                  <v-flex xs5>
                      Họ và tên:
                  </v-flex>
                  <v-flex xs7>
                      {{clientName}}
                  </v-flex>
                </v-layout>

                <v-layout>
                  <v-flex xs5>
                      ĐTDĐ:
                  </v-flex>
                  <v-flex xs7>
                      {{phone}}
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

                <v-layout>
                  <v-flex xs5>
                      Địa chỉ:
                  </v-flex>
                  <v-flex xs7>
                      {{fulladdress}}
                  </v-flex>
                </v-layout>

              </v-flex>

              <v-flex sm6>
                  <strong>BÊN ĐƯỢC UỶ QUYỀN (BÊN B):</strong>
                  <br/>
                  Công ty TNHH Đầu Tư và Phát Triển Kinh Doanh ICADO
                  <br/>
                  GPKD số: 0313412428
                  <br/>
                  Địa chỉ: {{branchAddress}}
              </v-flex>
            </v-layout>
            <br/>
            <strong>I. NỘI DUNG UỶ QUYỀN</strong>
            <br/><br/>
            <span>Trong trường hợp Bên A không hoàn thành nghĩa vụ đóng lãi hoặc chuộc xe máy/ô tô đúng thời hạn đã được thể hiện trong hợp đồng cầm cố số:{{branchName}} - {{loanId}} Thì Bên A ủy quyền cho Bên B toàn quyền sở hữu và quyết định (bán, sang tên, ...) xe máy/ô tô được thể hiện trong hợp đồng cầm cố số: {{branchName}} - {{loanId}} .Thông tin xe máy/ô tô cụ thể như sau:</span>
            <br/>
            <ul>
              <table>
                <tr>
                  <td>
                    <li>Số máy:</li>
                  </td>
                  <td>
                    {{vehicleID}}
                  </td>
                </tr>
                <tr>
                  <td>
                    <li>Số khung:</li>
                  </td>
                  <td>
                    {{chassisNumber}}
                  </td>
                </tr>
                <tr>
                  <td>
                    <li>Nhãn hiệu:</li>
                  </td>
                  <td>
                    {{label}}
                  </td>
                </tr>
                <tr>
                  <td>
                    <li>Loại xe:</li>
                  </td>
                  <td>
                    {{vehicleType}}
                  </td>
                </tr>
                <tr>
                  <td>
                    <li>Màu sơn:</li>
                  </td>
                  <td>
                    {{color}}
                  </td>
                </tr>
                <tr>
                  <td>
                    <li>Biển số đăng ký:</li>
                  </td>
                  <td>
                    {{licensePlate}}
                  </td>
                </tr>
              </table>
            </ul>
            <br/>
            <strong>II. CAM KẾT</strong>
            <br/><br/>
            <span>Hai bên cam kết sẽ hoàn toàn chịu trách nhiệm trước Pháp luật về mọi thông tin ủy quyền ở trên.
              Giấy ủy quyền trên được lập thành 2 bản, mổi bên giữ 1 bản và có hiệu lực ngang nhau.</span>
            <br/><br/><br/>
            <v-layout>
              <v-flex sm6>
                <center>
                  BÊN UỶ QUYỀN
                  <br/>
                  (Ký, ghi rõ họ tên)
                </center>
              </v-flex>
              <v-flex sm6>
                <center>
                  BÊN ĐƯỢC UỶ QUYỀN
                  <br/>
                  (Ký, ghi rõ họ tên)
                </center>
              </v-flex>
            </v-layout>
          </div>
        </div>
      </v-card>
      
      <v-dialog v-model="dialog" persistent max-width="1000px">
        <v-card>
          <v-card-title >
              <span class="title">Thông tin khách hàng chung sở hữu</span>
          </v-card-title>

          <v-divider></v-divider>

          <v-card-text>
            <v-form v-model="valid">
              <v-container>
                <v-layout>
                  <v-flex sm5>
                      <v-text-field
                        v-model="anotherCustomerName"
                        label="Khách hàng 2"
                      >
                      </v-text-field>
                  </v-flex>
                  <v-spacer/>
                  <v-flex sm5>
                    <v-text-field
                        v-model="anotherNationalId"
                        label="CMND/HC 2"
                        :rules="[
                            v => /^[a-zA-Z]?[0-9]{0,20}$|^null$|^\s*$/.test(v) || 'CMND/HC không quá 20 ký tự',
                        ]"
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="btn-confirm"
              @click="dialog = false"
              :disabled="!valid"
              color="#dd1e26"
              round
            >
              OK
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-dialog>

      <div class="box-preview-right">
        <v-card class="body-container">
          <strong>VUI LÒNG KIỂM TRA SỐ TIỀN VÀ</strong><br>
          <strong>IN PHIẾU THU</strong>
          <v-layout align-center justify-center row>
            <v-btn round class="btn-back" @click="backHandle">
              Back
            </v-btn>
            <v-btn fab dark small class="btn-print" @click="printHandle">
              <i class="material-icons">print</i>
            </v-btn>
          </v-layout>
        </v-card>
      </div>
    </v-layout>
  </v-container>
</template>
<script>
import {mapActions ,mapGetters} from 'vuex'
import {getCost, getInterestValue, getRoundFee} from './utils/caculate'

export default {
  name: "reprint",
  data() {
    return {
      assetType: '',
      maturesDate: '',
      dueDate: '',
      clientName: '',
      anotherCustomerName: '',
      phone: '',
      birthDay: '',
      nationalId: '',
      anotherNationalId: '',
      fulladdress: '',
      branchName: '',
      asset: '',
      description: '',
      accessory: '',
      approvedAmount: 0,
      interestRate: null,
      productId: null,
      warehousingFee: 0,
      loanId: '',
      clientId: '',
      dialog: false,
      valid: false,
      vehicleID: '',
      chassisNumber: '',
      label: '',
      vehicleType: '',
      color: '',
      licensePlate: '',
    }
  },
  mounted() {
    this.getSAssetList()
    this.getProduct()
    this.getContractByContractId({id: this.$route.params.id})
  },
  beforeDestroy() {
    this.resetContractDetail()
    this.resetClientDetail()
  },
  computed: {
    ...mapGetters({
      contractDetailErrorCode: 'contract/contractDetailErrorCode',
      contractDetail: 'contract/contractDetail',
      SAssetListResult: 'asset/SAssetListResult',
      clientDetailResult: 'client/clientDetailResult',
      clientDetailErrorCode: 'client/clientDetailErrorCode',
      productListResult: 'product/productListResult',
      branchListResult: 'branch/branchListResult'
    }),
    formatedApprovedAmount() {
      return (this.approvedAmount * 1000000).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace('.0', '')
    },
    formatedReceivedAmount() {
      return (this.cost * 1000000).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace('.0', '')
    },
    formatedInterestMoneyHint() {
      return (this.interestMoney * 1000000).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace('.0', '')
    },
    contractType() {
        try {
            const name = this.findAssetNameType(this.asset)
            if (name === 'Realestate') {
                return 'Realestate'
            } else if (name === 'Bike' || name === 'Car' || name === 'Truck') {
                return 'Bike/Car'
            }
        } catch (error) {}
        
        return 'normal'
    },
    period() {
      if (this.repayEvery === 30) {
        return '1 Tháng'
      }
      return `${this.repayEvery} Ngày`
    },
    interestTypeContent1() {
      try {
        if (this.productName.includes('Prepaid Interest')) {
          return "đã khấu trừ tiền lãi suất đầu kỳ là"
        }
        return "và sẽ thu tiền lãi suất mỗi kỳ là"
      } catch (error) {
        return null
      }
      
    },
    interestTypeContent2() {
      try {
        if (this.productName.includes('Prepaid Interest')) {
          return "."
        }
        return " vào ngày hết hạn hợp đồng."
      } catch (error) {
        return null
      }
    },
    fee() {
      try {
        return parseFloat(this.interestRate) - 1.5
      } catch (error) {
        return null
      }
    },
    product() {
      try {
        for (let key of Object.keys(this.productListResult)) {
          if (this.productId === this.productListResult[key].id) {
            return this.productListResult[key]
          }
        }
      } catch (error) {
        return null
      }
    },
    productName() {
      try {
        return this.product.productName
      } catch (error) {
        return null
      }
    },
    repayEvery() {
      try {
        return this.product.repayEvery
      } catch (error) {
        return null
      }
    },
    cost() {
      try {
        return getCost(this.approvedAmount, this.interestRate, this.productName)
      } catch (error) {
        return null
      }
    },
    interestMoney() {
      try {
        return getInterestValue(this.approvedAmount, this.productName, this.cost, this.interestRate)
      } catch (error) {
        return null
      }
    },
    branchAddress() {
      try {
        for (let branch of this.branchListResult) {
          if (this.branchName === branch.name) {
            return branch.address
          }
        }
      } catch (error) {
        
      }
      
      return null
    }
  },
  methods: {
    ...mapActions({
      getSAssetList: 'asset/getSAssetList',
      getContractByContractId: 'contract/getContractByContractId',
      resetContractDetail: 'contract/resetContractDetail',
      getProduct: 'product/getProduct',
      getClientById: 'client/getClientById',
      resetClientDetail: 'client/resetClientDetail',
    }),
    //Find asset from asset description
    findAssetNameType(assetType) {
      for (let item of this.SAssetListResult) {
        if (item.description === assetType) {
          return item.name
        }
      }
    },
    backHandle() {
      this.$router.back()
    },
    printHandle() {
      this.$htmlToPaper('print')
    },
  },
  watch: {
    contractDetailErrorCode() {
      if (this.contractDetailErrorCode === 200) {
        this.maturesDate = this.contractDetail.maturesDate
        this.getClientById({id: this.contractDetail.clientId})
        this.asset = this.contractDetail.assetType
        this.branchName = this.contractDetail.branchName
        this.productId = this.contractDetail.product

        const [asset, accessory, authorization] = this.contractDetail.assetDescription.split('|')
        if (!/^null$|^\s*$/.test(authorization)) {
          if (!/^null$|^\s*$/.test(asset)) {
            this.description = `${asset} | ${authorization}`
          } else {
            // Maybe car, motorbike have no asset
            this.description = authorization
          }
        } else {
          this.description = asset
        }
        
        try {
          this.label = authorization.match(/Nhãn hiệu:(.*?)-Dòng/gs)[0].replace("Nhãn hiệu:",'').replace("-Dòng",'')
          this.vehicleType = authorization.match(/Dòng xe:(.*?)Số/gs)[0].replace("Dòng xe:",'').replace("-Số",'')
          this.chassisNumber = authorization.match(/Số khung:(.*?)-Màu/gs)[0].replace("Số khung:",'').replace("-Màu",'')
          this.color = authorization.match(/Màu sơn:(.*?)-Số/gs)[0].replace("Màu sơn:",'').replace("-Số",'')
          this.vehicleID = authorization.match(/Số máy:(.*?)-Biển/gs)[0].replace("Số máy:",'').replace("-Biển",'')
          this.licensePlate = authorization.match(/Biển số đăng ký:(.*)/gs)[0].replace("Biển số đăng ký:",'')
        } catch (error) {
          
        }

        this.accessory = accessory
        this.interestRate = this.contractDetail.specialInterestValue
        this.approvedAmount = this.contractDetail.approvedAmount
        this.dueDate = this.contractDetail.dueDate
        this.warehousingFee = this.contractDetail.warehousingFee
        this.loanId = this.contractDetail.loanId
      }
    },
    clientDetailErrorCode() {
      if (this.clientDetailErrorCode === 200) {
        this.phone = this.clientDetailResult.primaryPhone
        this.birthDay = this.clientDetailResult.dateOfBirth
        this.nationalId = this.clientDetailResult.nationalId
        this.clientId = this.clientDetailResult.mifosId
        this.clientName = this.clientDetailResult.fullName

        const address = this.clientDetailResult.address == '' ? '' : `${this.clientDetailResult.address},`
        const district = this.clientDetailResult.district == '' ? '' : `${this.clientDetailResult.district},`
        this.fulladdress = address + district +this.clientDetailResult.city
      }
    },
    contractType() {
      if (this.contractType === 'Realestate') {
        this.dialog = true
      }
    },
  }
}
</script>

<style scoped>
.container-repayment-preview {
  padding: 0px !important;
}
.box-preview-left {
  padding: 50px !important;
}

.box-preview-left .margin-left {
    margin-left: 50px;
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

span { 
  display:block;
  width:733px;
  word-wrap:break-word;
}

button {
  margin-right: 5px;
  font-size: 0.9vw !important;
  color: #ffffff !important;
  text-transform: capitalize !important;
}

.btn-print {
  background-color: #43425D !important;
}

.btn-back {
  background-color: #FFFFFF !important;
  color: #DD1E26 !important;
  min-width: 4vw !important;
}

.btn-back:focus {
  background-color: #EAE5E5 !important;
}

.btn-confirm {
  background-color: #DD1E26 !important;
  color: #FFFFFF;
}

.btn-confirm:hover {
  background-color: #E84D4D !important;
}
</style>