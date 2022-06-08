<template>
    <v-container fluid class="pa-0 ma-2">
        <h2 v-if="contract">Kiểm Tra Hợp Đồng</h2>
        <v-layout v-else row>
            <v-flex md5 class="title">
                <h2 v-show="step==1">Hợp Đồng Mới - Thông Tin KH</h2>
                <h2 v-show="step==2 && !isAuthorizedForm">Hợp Đồng Mới - Thông Tin Tài Sản</h2>
                <h2 v-show="step==2 && isAuthorizedForm">
                    Hợp Đồng Mới - 
                    <template v-if="authorizedType==='Bike/Car'">Giấy Uỷ Quyền</template>
                    <template v-else-if="authorizedType==='Realestate'">Hợp Đồng Mua Bán</template>
                </h2>
                <h2 v-show="step==3">Hợp Đồng Mới - Thông Tin HĐ</h2>
                <h2 v-show="step==4">Hợp Đồng Mới - Xác Nhận</h2>
                <h2 v-show="step==5">Hợp Đồng Mới - Hoàn Thành</h2>
            </v-flex>
            <v-flex md7 v-show="!contract">
                <v-stepper v-model="step" class="elevation-0 background">
                    <v-stepper-header>
                        <template v-for="index in 4" class="step">
                            <v-stepper-step :step="index" color="#dd1e26" :key="`step-${index}`">Step {{index}}</v-stepper-step>
                            <v-divider v-if="index !== 4" :key="`divider-${index}`"/>
                        </template>
                    </v-stepper-header>
                </v-stepper>
            </v-flex>
        </v-layout>

        <v-window v-if="!contract" v-model="step">
            <v-window-item :value="1" class="padding">
                <v-form v-model="valid1">
                    <v-container :style="{'padding-top': '0px'}">
                        <v-layout>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="firstNameInput"
                                    label="Họ*"
                                    :rules="[
                                        v => !!v || 'Yêu cầu cần có',
                                        v => {
                                            if(typeof v === 'string') {
                                                return v.length < 50 || 'Không quá 50 ký tự'
                                            }
                                            return false
                                        } ,
                                    ]"
                                    :readonly="!newClient"
                                    hint="Ví dụ: Phạm"
                                >
                                </v-text-field>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="lastNameInput"
                                    label="Tên*"
                                    :rules="[
                                        v => !!v || 'Yêu cầu cần có',
                                    ]"
                                    :readonly="!newClient"
                                    hint="Ví dụ: Lê David"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="phone1Input"
                                    label="Phone 1*"
                                    :readonly="!newClient"
                                >
                                </v-text-field>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="phone2Input"
                                    :rules="[
                                        //Phone has charater pre '+' (only one or no), from 10-13 digits.
                                       v => /^null$|^\s*$|^[0-9]{10,13}?$/.test(v) || 'Dữ liệu không hợp lệ'
                                    ]"
                                    label="Phone 2"
                                    :readonly="!newClient"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <date-picker 
                                    v-model="dobInput" 
                                    label="Ngày Sinh*"
                                    :format="format"
                                    :rules="dobRules"
                                    persistent-hint
                                    hint="Ví dụ: 12-4-1998"
                                />
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="nationalIdInput"
                                    label="CMND/HC*"
                                    @keyup="search"
                                    @keydown.enter="searchClientByNationalId"
                                    ref="nationalId1"
                                    :rules="[
                                        v => !!v || 'Yều cầu cần có',
                                        v => /^[a-zA-Z]?[0-9]{0,20}$/.test(v) || 'CMND/HC không quá 20 ký tự',
                                    ]"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-text-field
                            v-model.lazy="addressInput"
                            :rules="addressRules"
                            label="Địa chỉ*"
                            :readonly="!newClient && authorizedType === 'normal'"
                        >
                        </v-text-field>
                        <v-layout>
                            <v-flex sm5>
                                <v-select
                                    v-model="genderInput"
                                    item-value="value"
                                    item-text="text"
                                    :items="genderItems"
                                    label="Giới tính"
                                    :rules="[
                                        v => !!v || 'Yều cầu cần có',
                                    ]"
                                >
                                </v-select>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model="sourceInput"
                                    label="Source"
                                    disabled
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <v-select
                                    v-model="districtInput"
                                    :items="districtItems"
                                    :rules="districtRules"
                                    label="Quận/Huyện"
                                    :disabled="!newClient && authorizedType === 'normal'"
                                >
                                </v-select>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-select
                                    v-model="cityInput"
                                    :items="cityItems"
                                    :rules="cityRules"
                                    label="Thành phố"
                                    :disabled="!newClient && authorizedType === 'normal'"
                                >
                                </v-select>
                            </v-flex>
                        </v-layout>
                        <v-layout
                            align-center
                            justify-end
                        >
                            <v-btn 
                                class="backBtn"
                                color="#fff"
                                round
                                @click="cancelHandle"
                            >
                                Back
                            </v-btn>
                            <v-btn 
                                class="nextBtn"
                                color="#dd1e26"
                                @click="step++"
                                :disabled="!valid1"
                                round
                            >
                                Next
                            </v-btn>
                        </v-layout>
                    </v-container>
                </v-form>
            </v-window-item>
            <v-window-item :value="2" class="padding">
                <v-form v-model="authorizedValid" v-show="isAuthorizedForm">
                    <v-container>
                        <template v-if="authorizedType==='Bike/Car'">
                            <v-layout>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="labelInput"
                                        label="Nhãn hiệu"
                                        :rules="[v => !!v || 'Yều cầu cần có']"
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-spacer/>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="vehicleTypeInput"
                                        label="Dòng xe"
                                        :rules="[v => !!v || 'Yều cầu cần có']"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="chassisNumberInput"
                                        label="Số khung"
                                        :rules="[v => !!v || 'Yều cầu cần có']"
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-spacer/>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="colorInput"
                                        label="Màu sơn"
                                        :rules="[v => !!v || 'Yều cầu cần có']"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="vehicleIDInput"
                                        label="Số máy"
                                        :rules="[v => !!v || 'Yều cầu cần có']"
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-spacer/>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="licensePlateInput"
                                        label="Biển số đăng ký"
                                        :rules="[v => !!v || 'Yều cầu cần có']"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </template>
                        <template v-else-if="authorizedType==='Realestate'">
                            <v-layout>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="customer2Input"
                                        label="Khách hàng 2"
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-spacer/>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="nationalId2Input"
                                        label="CMND/HC 2"
                                        :rules="[
                                            v => /^[a-zA-Z]?[0-9]{0,20}$|^null$|^\s*$/.test(v) || 'CMND/HC không quá 20 ký tự',
                                        ]"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </template>
                        <v-layout
                            align-center
                            justify-end
                        >
                            <v-btn 
                                class="backBtn"
                                color="#fff"
                                @click="step--"
                                round
                            >
                                Back
                            </v-btn>
                            <v-btn
                                class="nextBtn"
                                color="#dd1e26"
                                @click="isAuthorizedForm = false"
                                round
                                :disabled="!authorizedValid"
                            >
                                Next
                            </v-btn>
                        </v-layout>
                    </v-container>
                </v-form>
                <v-form ref="form2_1" v-model="valid2" v-show="!isAuthorizedForm">
                    <v-container>
                        <v-layout>
                            <v-flex sm5>
                                <v-textarea
                                    :key="autoGrowHack"
                                    v-model="assetInput"
                                    label="Mô tả tài sản*"
                                    rows="1"
                                    auto-grow
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    required
                                >
                                </v-textarea>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model="expectedAmountInput"
                                    :rules="[
                                        v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                    ]"
                                    label="Giá mong muốn"
                                    :hint="this.expectedAmountHint"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <v-select
                                    v-model="assetTypeInput"
                                    :items="assetTypeItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    label="Loại tài sản*"
                                    disabled
                                >
                                </v-select>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model="validatorAmountInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Giá thẩm định"
                                    :hint="this.validatorAmountHint"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <v-textarea
                                    :key="autoGrowHack"
                                    v-model.lazy="accessoryInput"
                                    label="Phụ Kiện"
                                    rows="1"
                                    auto-grow
                                    >
                                </v-textarea>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model="approvedAmountInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ',
                                            v => {
                                                if (parseFloat(v) > validatorAmountInput) {
                                                    return 'Không được lớn hơn giá thẩm định'
                                                }
                                                return true
                                            },
                                        ]"
                                    label="Giá cầm"
                                    :hint="approvedAmountHint"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout
                            align-center
                            justify-end
                        >
                            <v-btn 
                                class="backBtn"
                                color="#fff"
                                @click="assetBackHandle"
                                round
                            >
                                Back
                            </v-btn>
                            <v-btn
                                class="nextBtn"
                                color="#dd1e26"
                                @click="step++"
                                round
                                :disabled="!valid2"
                            >
                                Next
                            </v-btn>
                        </v-layout>
                    </v-container>
                </v-form>
            </v-window-item>
            <v-window-item :value="3" class="padding">
                <v-form ref="form3_1" v-model="valid3">
                    <v-container>
                        <v-layout>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="contractIDInput"
                                    label="Mã HĐ"
                                    :readonly="true"
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <date-picker
                                    v-model="openingDateInput"
                                    label="Ngày mở hợp đồng*"
                                    :format="format"
                                    :rules="openingDateRule"
                                />
                            </v-flex>
                            <v-flex sm4>
                                
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm4>
                                <v-select
                                    v-model="packageInput"
                                    :items="packageItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    label="Gói"
                                >
                                </v-select>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="expirationDateInput"
                                    label="Ngày hết hạn hợp đồng"
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="interestRateInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => {
                                                if (v>0 && v<=8) {
                                                    return true
                                                } return 'Lãi suất phải nằm từ 0 đến 8%'
                                            }
                                        ]"
                                    label="Lãi suất*"
                                    :disabled="interestRateDisabled"
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="approvedAmountInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ',
                                            v => {
                                                if (parseFloat(v) > validatorAmountInput) {
                                                    return 'Không được lớn hơn giá thẩm định'
                                                }
                                                return true
                                            },
                                        ]"
                                    label="Giá cầm*"
                                    :hint="approvedAmountHint"
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="roundingInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Khoản làm tròn"
                                    readonly
                                    persistent-hint
                                    :hint="roundingHint"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm4>
                                <v-text-field
                                    v-if="promotionInput.trim() !== ''"
                                    v-model="promotionInput"
                                    label="Khuyến mãi"
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="costInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Gốc*"
                                    :hint="costHint"
                                    persistent-hint
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="warehousingFeeInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Phí kho bãi"
                                    :hint="warehousingFeeHint"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm4>
                                <!-- <label class="v-label theme--light"> Phương thức </label>
                                <v-radio-group v-model="methodInput" row>
                                    <v-radio color="#dd1e26" label="Tiền mặt" value="Tiền mặt"></v-radio>
                                    <v-radio color="#dd1e26" label="Chuyển khoản" value="Chuyển khoản"></v-radio>
                                </v-radio-group> -->
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="interestValueInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Tiền lãi"
                                    :hint="interestValueHint"
                                    persistent-hint
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="receivedAmountInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ',
                                            v => v >= 0 || 'Không thể giá trị âm'
                                        ]"
                                    label="Số tiền nhận được"
                                    :hint="this.receivedAmountHint"
                                    persistent-hint
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <!-- <v-select
                                    v-model="bankInput"
                                    :items="bankItems"
                                    label="Ngân hàng"
                                    :disabled="methodInput == 'Tiền mặt'"
                                >
                                </v-select> -->
                            </v-flex>
                            <v-flex sm3>
                                <!-- <v-text-field
                                    v-model="accountNumberInput"
                                    :style="{'margin-left': '5px'}"
                                    :rules="[
                                            v => /^\d*$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Số tài khoản"
                                    :disabled="methodInput == 'Tiền mặt'"
                                >
                                </v-text-field> -->
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm8>
                                <!-- <v-text-field
                                    v-model="bankBranchInput"
                                    label="Chi Nhánh/PGD"
                                    :disabled="methodInput == 'Tiền mặt'"
                                >
                                </v-text-field> -->
                            </v-flex>
                        </v-layout>
                        <v-layout
                            align-center
                            justify-end
                        >
                            <v-btn
                                class="backBtn"
                                color="#fff"
                                @click="step--"
                                round
                            >
                                Back
                            </v-btn>
                            <v-btn
                                class="nextBtn"
                                color="#dd1e26"
                                @click="step++"
                                round
                                :disabled="!valid3"
                            >
                                Next
                            </v-btn>
                        </v-layout>
                    </v-container>
                </v-form>
            </v-window-item>
            <v-window-item :value="4">
                <v-form v-model="valid1" class="form">
                    <center><p class="title-form">Thông Tin Khách Hàng</p></center>
                    <v-container :style="{'padding-top': '0px'}">
                        <v-layout>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="firstNameInput"
                                    label="Họ*"
                                    :rules="[
                                        v => !!v || 'Yêu cầu cần có',
                                        v => {
                                            if(typeof v === 'string') {
                                                return v.length < 50 || 'Không quá 50 ký tự'
                                            }
                                            return false
                                        }
                                    ]"
                                    :readonly="newClient ? !edit1 : true "
                                    hint="Ví dụ: Phạm"
                                >
                                </v-text-field>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="lastNameInput"
                                    label="Tên*"
                                    :rules="[
                                        v => !!v || 'Yêu cầu cần có',
                                    ]"
                                    :readonly="newClient ? !edit1 : true "
                                    hint="Ví dụ: Lê David"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="phone1Input"
                                    label="Phone 1*"
                                    :readonly="!newClient"
                                >
                                </v-text-field>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="phone2Input"
                                    :rules="[
                                        //Phone has charater pre '+' (only one or no), from 10-13 digits.
                                       v => /^null$|^\s*$|^[0-9]{10,13}?$/.test(v) || 'Dữ liệu không hợp lệ'
                                    ]"
                                    label="Phone 2"
                                    :readonly="newClient ? !edit1 : true "
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <date-picker 
                                    v-model="dobInput" 
                                    label="Ngày Sinh*" 
                                    :readonly="edit1"
                                    :format="format"
                                    :rules="dobRules"
                                    persistent-hint
                                    hint="Ví dụ: 12-4-1998"
                                />
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model.lazy="nationalIdInput"
                                    label="CMND/HC*"
                                    :readonly="!edit1"
                                    @keyup="search"
                                    @keydown.enter="searchClientByNationalId"
                                    ref="nationalId2"
                                    :rules="[
                                        v => !!v || 'Yều cầu cần có',
                                        v => /^[a-zA-Z]?[0-9]{0,20}$/.test(v) || 'CMND/HC không quá 20 ký tự',
                                    ]"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-text-field
                            v-model.lazy="addressInput"
                            :rules="addressRules"
                            label="Địa chỉ*"
                            :readonly="!newClient && authorizedType === 'normal' ? !edit1 : true "
                        >
                        </v-text-field>
                        <v-layout>
                            <v-flex sm5>
                                <v-select
                                    v-model="genderInput"
                                    item-value="value"
                                    item-text="text"
                                    :items="genderItems"
                                    label="Giới tính"
                                    :disabled="!edit1"
                                    :rules="[
                                        v => !!v || 'Yều cầu cần có',
                                    ]"
                                >
                                </v-select>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model="sourceInput"
                                    label="Source"
                                    :disabled="true"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <v-select
                                    v-model="districtInput"
                                    :items="districtItems"
                                    :rules="districtRules"
                                    label="Quận/Huyện"
                                    :disabled="!newClient && authorizedType === 'normal' ? !edit1 : true "
                                >
                                </v-select>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-select
                                    v-model="cityInput"
                                    :items="cityItems"
                                    :rules="cityRules"
                                    label="Thành phố"
                                    :disabled="!newClient && authorizedType === 'normal' ? !edit1 : true "
                                >
                                </v-select>
                            </v-flex>
                        </v-layout>
                        <v-layout
                            align-center
                            justify-end
                            v-show="!edit2 && !editAuthorized && !edit3"
                        >
                            <v-dialog
                                v-model="dialog1"
                                width="300"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        class="backBtn"
                                        color="#fff"
                                        round
                                        v-on="on"
                                        v-show="!edit1"
                                    >
                                        <i class="fas fa-pen" style="margin-right:5px"></i>
                                        Edit
                                    </v-btn>
                                </template>

                                <v-card class="pa-4">
                                    <center>
                                        <strong>Xác nhận chỉnh sửa hợp đồng</strong>
                                    </center>
                                    <v-layout align-center justify-center row fill-height>
                                        <v-btn
                                            class="yesBtn"
                                            color="#157F1F"
                                            round
                                            @click="edit1=true; dialog1=false"
                                        >
                                            Yes
                                        </v-btn>
                                        <v-btn
                                            class="backBtn"
                                            color="#fff"
                                            round
                                            @click="dialog1=false"
                                        >
                                            No
                                        </v-btn>
                                    </v-layout>
                                </v-card>
                            </v-dialog>
                            <v-btn class="nextBtn"
                                color="#dd1e26"
                                round
                                @click="edit1=false"
                                v-show="edit1"
                                :disabled="!valid1"
                            >
                                Accept
                            </v-btn>
                        </v-layout>
                    </v-container>
                </v-form>
                <br/>
                <v-form ref="form2_2" v-model="valid2" class="form">
                    <center><p class="title-form">Thông Tin Tài Sản</p></center>
                    <v-container>
                        <v-layout>
                            <v-flex sm5>
                                <v-textarea
                                    :key="autoGrowHack"
                                    v-model.lazy="assetInput"
                                    label="Mô tả tài sản*"
                                    rows="1"
                                    auto-grow
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    required
                                    :readonly="!edit2"
                                >
                                </v-textarea>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model="expectedAmountInput"
                                    :rules="[
                                        v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                    ]"
                                    label="Giá mong muốn"
                                    :hint="this.expectedAmountHint"
                                    :readonly="!edit2"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <v-select
                                    v-model="assetTypeInput"
                                    :items="assetTypeItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    label="Loại tài sản*"
                                    disabled
                                >
                                </v-select>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    v-model="validatorAmountInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Giá thẩm định"
                                    :hint="this.validatorAmountHint"
                                    :readonly="!edit2"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <v-textarea
                                    :key="autoGrowHack"
                                    v-model.lazy="accessoryInput"
                                    label="Phụ Kiện"
                                    rows="1"
                                    auto-grow
                                    :readonly="!edit2"
                                    >
                                </v-textarea>
                            </v-flex>
                            <v-spacer/>
                            <v-flex sm5>
                                <v-text-field
                                    :key="autoCallRules"
                                    v-model="approvedAmountInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ',
                                            v => {
                                                if (parseFloat(v) > validatorAmountInput) {
                                                    return 'Không được lớn hơn giá thẩm định'
                                                }
                                                return true
                                            },
                                        ]"
                                    label="Giá cầm"
                                    :hint="approvedAmountHint"
                                    :readonly="!edit2"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout
                            align-center
                            justify-end
                            v-show="!edit1 && !editAuthorized && !edit3"
                        >
                            <v-dialog
                                v-model="dialog2"
                                width="300"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        class="backBtn"
                                        color="#fff"
                                        round
                                        v-on="on"
                                        v-show="!edit2"
                                    >
                                        <i class="fas fa-pen" style="margin-right:5px"></i>
                                        Edit
                                    </v-btn>
                                </template>

                                <v-card class="pa-4">
                                    <center>
                                        <strong>Xác nhận chỉnh sửa hợp đồng</strong>
                                    </center>
                                    <v-layout align-center justify-center row fill-height>
                                        <v-btn
                                            class="yesBtn"
                                            color="#157F1F"
                                            round
                                            @click="edit2=true; dialog2=false"
                                        >
                                            Yes
                                        </v-btn>
                                        <v-btn
                                            class="backBtn"
                                            color="#fff"
                                            round
                                            @click="dialog2=false"
                                        >
                                            No
                                        </v-btn>
                                    </v-layout>
                                </v-card>
                            </v-dialog>
                            <v-btn class="nextBtn"
                                color="#dd1e26"
                                round
                                @click="edit2=false"
                                v-show="edit2"
                                :disabled="!valid2"
                            >
                                Accept
                            </v-btn>
                        </v-layout>
                    </v-container>
                </v-form>
                <br/>
                <v-form v-model="authorizedValid" v-show="isAuthorizedForm" class="form">
                    <center>
                        <p class="title-form">
                            <template v-if="authorizedType==='Bike/Car'">Giấy Uỷ Quyền</template>
                            <template v-else-if="authorizedType==='Realestate'">Hợp Đồng Mua Bán</template>
                        </p>
                    </center>
                    <v-container>
                        <template v-if="authorizedType==='Bike/Car'">
                            <v-layout>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="labelInput"
                                        label="Nhãn hiệu"
                                        :rules="[v => !!v || 'Yều cầu cần có']"
                                        :readonly="!editAuthorized"
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-spacer/>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="vehicleTypeInput"
                                        label="Dòng xe"
                                        :rules="[v => !!v || 'Yều cầu cần có']"
                                        :readonly="!editAuthorized"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="chassisNumberInput"
                                        label="Số khung"
                                        :rules="[v => !!v || 'Yều cầu cần có']"
                                        :readonly="!editAuthorized"
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-spacer/>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="colorInput"
                                        label="Màu sơn"
                                        :rules="[v => !!v || 'Yều cầu cần có']"
                                        :readonly="!editAuthorized"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="vehicleIDInput"
                                        label="Số máy"
                                        :rules="[v => !!v || 'Yều cầu cần có']"
                                        :readonly="!editAuthorized"
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-spacer/>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="licensePlateInput"
                                        label="Biển số đăng ký"
                                        :rules="[v => !!v || 'Yều cầu cần có']"
                                        :readonly="!editAuthorized"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </template>
                        <template v-else-if="authorizedType==='Realestate'">
                            <v-layout>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="customer2Input"
                                        label="Khách hàng 2"
                                        :readonly="!editAuthorized"
                                    >
                                    </v-text-field>
                                </v-flex>
                                <v-spacer/>
                                <v-flex sm5>
                                    <v-text-field
                                        v-model="nationalId2Input"
                                        label="CMND/HC 2"
                                        :rules="[
                                            v => /^[a-zA-Z]?[0-9]{0,20}$|^null$|^\s*$/.test(v) || 'CMND/HC không quá 20 ký tự',
                                        ]"
                                        :readonly="!editAuthorized"
                                    >
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </template>
                        <v-layout
                            align-center
                            justify-end
                            v-show="!edit1 && !edit2 && !edit3"
                        >
                            <v-dialog
                                v-model="dialogAuthorized"
                                width="300"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        class="backBtn"
                                        color="#fff"
                                        round
                                        v-on="on"
                                        v-show="!editAuthorized"
                                    >
                                        <i class="fas fa-pen" style="margin-right:5px"></i>
                                        Edit
                                    </v-btn>
                                </template>

                                <v-card class="pa-4">
                                    <center>
                                        <strong>Xác nhận chỉnh sửa hợp đồng</strong>
                                    </center>
                                    <v-layout align-center justify-center row fill-height>
                                        <v-btn
                                            class="yesBtn"
                                            color="#157F1F"
                                            round
                                            @click="editAuthorized=true; dialogAuthorized=false"
                                        >
                                            Yes
                                        </v-btn>
                                        <v-btn
                                            class="backBtn"
                                            color="#fff"
                                            round
                                            @click="dialogAuthorized=false"
                                        >
                                            No
                                        </v-btn>
                                    </v-layout>
                                </v-card>
                            </v-dialog>
                            <v-btn class="nextBtn"
                                color="#dd1e26"
                                round
                                @click="editAuthorized=false"
                                v-show="editAuthorized"
                                :disabled="!authorizedValid"
                            >
                                Accept
                            </v-btn>
                        </v-layout>
                    </v-container>
                </v-form>
                <br/>
                <v-form ref="form3_2" v-model="valid3" class="form">
                    <center><p class="title-form">Thông Tin Hợp Đồng</p></center>
                    <v-container>
                        <v-layout>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="contractIDInput"
                                    label="Mã HĐ"
                                    :readonly="true"
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <date-picker 
                                    v-model="openingDateInput" 
                                    :readonly="!edit3" 
                                    label="Ngày mở hợp đồng*"
                                    :format="format"
                                    :rules="openingDateRule"
                                />
                            </v-flex>
                            <v-flex sm4>
                                
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm4>
                                <v-select
                                    v-model="packageInput"
                                    :items="packageItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    label="Gói"
                                    :readonly="!edit3"
                                >
                                </v-select>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="expirationDateInput"
                                    label="Ngày hết hạn hợp đồng"
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="interestRateInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => {
                                                if (v>0 && v<=8) {
                                                    return true
                                                } return 'Lãi suất phải nằm từ 0 đến 8%'
                                            }
                                        ]"
                                    label="Lãi suất*"
                                    :disabled="interestRateDisabled"
                                    :readonly="!edit3"
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="approvedAmountInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ',
                                            v => {
                                                if (parseFloat(v) > validatorAmountInput) {
                                                    return 'Không được lớn hơn giá thẩm định'
                                                }
                                                return true
                                            },
                                        ]"
                                    label="Giá cầm*"
                                    :hint="approvedAmountHint"
                                    :readonly="!edit3"
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="roundingInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Khoản làm tròn"
                                    readonly
                                    persistent-hint
                                    :hint="roundingHint"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm4>
                                <v-text-field
                                    v-if="promotionInput.trim() !== ''"
                                    v-model="promotionInput"
                                    label="Khuyến mãi"
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="costInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Gốc*"
                                    :hint="costHint"
                                    persistent-hint
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="warehousingFeeInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Phí kho bãi"
                                    :hint="warehousingFeeHint"
                                    :readonly="!edit3"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm4>
                                <!-- <label class="v-label theme--light"> Phương thức </label>
                                <v-radio-group v-model="methodInput" row :readonly="!edit3">
                                    <v-radio color="#dd1e26" label="Tiền mặt" value="Tiền mặt"></v-radio>
                                    <v-radio color="#dd1e26" label="Chuyển khoản" value="Chuyển khoản"></v-radio>
                                </v-radio-group> -->
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="interestValueInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Tiền lãi"
                                    :hint="interestValueHint"
                                    persistent-hint
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="receivedAmountInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ',
                                            v => v >= 0 || 'Không thể giá trị âm'
                                        ]"
                                    label="Số tiền nhận được"
                                    :hint="this.receivedAmountHint"
                                    persistent-hint
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm5>
                                <!-- <v-select
                                    v-model="bankInput"
                                    :items="bankItems"
                                    label="Ngân hàng"
                                    :disabled="methodInput == 'Tiền mặt' || !edit3"
                                >
                                </v-select> -->
                            </v-flex>
                            <v-flex sm3>
                                <!-- <v-text-field
                                    v-model="accountNumberInput"
                                    :style="{'margin-left': '5px'}"
                                    :rules="[
                                            v => /^\d*$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Số tài khoản"
                                    :disabled="methodInput == 'Tiền mặt'"
                                    :readonly="!edit3"
                                >
                                </v-text-field> -->
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm8>
                                <!-- <v-text-field
                                    v-model="bankBranchInput"
                                    label="Chi Nhánh/PGD"
                                    :disabled="methodInput == 'Tiền mặt'"
                                    :readonly="!edit3"
                                >
                                </v-text-field> -->
                            </v-flex>
                        </v-layout>
                        <v-layout
                            align-center
                            justify-end
                            v-show="!edit1 && !edit2 && !editAuthorized"
                        >
                            <v-btn
                                class="cancelBtn"
                                color="#808495"
                                round
                                @click="cancelHandle"
                            >
                                Cancel
                            </v-btn>
                            <v-dialog
                                v-model="dialog3"
                                width="300"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        class="backBtn"
                                        color="#fff"
                                        round
                                        v-on="on"
                                        v-show="!edit3"
                                    >
                                        <i class="fas fa-pen" style="margin-right:5px"></i>
                                        Edit
                                    </v-btn>
                                </template>

                                <v-card class="pa-4">
                                    <center class="edit">
                                        <strong>Xác nhận chỉnh sửa hợp đồng</strong>
                                    </center>
                                    <v-layout align-center justify-center row fill-height>
                                        <v-btn
                                            class="yesBtn"
                                            color="#157F1F"
                                            round
                                            @click="edit3=true; dialog3=false"
                                        >
                                            Yes
                                        </v-btn>
                                        <v-btn
                                            class="backBtn"
                                            color="#fff"
                                            round
                                            @click="dialog3=false"
                                        >
                                            No
                                        </v-btn>
                                    </v-layout>
                                </v-card>
                            </v-dialog>
                            <v-btn class="nextBtn"
                                color="#dd1e26"
                                round
                                @click="edit3=false"
                                v-show="edit3"
                                :disabled="!valid3"
                            >
                                Accept
                            </v-btn>
                            <v-btn class="nextBtn"
                                color="#dd1e26"
                                round
                                @click="contract=true"
                                :disabled="edit3"
                            >
                                Confirm
                            </v-btn>
                        </v-layout>
                    </v-container>
                </v-form>
            </v-window-item>
            <v-window-item :value="5">
                <v-card class="form">
                    <center>
                        <v-icon size="150" color="#157F1F">check_circle</v-icon>
                        <br/>
                        <strong class="content-success">HOÀN THÀNH HỢP ĐỒNG</strong>
                        <br/>
                        <v-btn class="nextBtn"
                            color="#dd1e26"
                            round
                            min-width="166"
                            min-height="51"
                            @click="backHandle"
                        >
                            Back
                        </v-btn>
                    </center>
                </v-card>
            </v-window-item>
        </v-window>
        <template v-else>
            <new-contract-preview
                :contractType="authorizedType"
                :transactionDate="openingDateInput"
                :customerName="`${firstNameInput} ${lastNameInput}`"
                :anotherCustomerName="customer2Input"
                :phoneNumber="phone1Input"
                :birthDay="dobInput"
                :nationalId="nationalIdInput"
                :anotherNationalId="nationalId2Input"
                :address="fullAddress"
                :asset="assetTypeInput"
                :assetDescription="assetInput"
                :accessory="accessoryInput"
                :approvedAmount="parseFloat(approvedAmountInput)"
                :date="expirationDateInput"
                :fee="parseFloat(interestRateInput) - 1.5"
                :cost="parseFloat(costInput)"
                :interestMoney="parseFloat(interestValueInput)"
                :productName="productListResult[packageInput].productName"
                :repayEvery="productListResult[packageInput].repayEvery"
                :vehicleID="vehicleIDInput"
                :chassisNumber="chassisNumberInput"
                :label="labelInput"
                :vehicleType="vehicleTypeInput"
                :color="colorInput"
                :licensePlate="licensePlateInput"
                :newClient="this.newClient"
                @back="contract=false" 
                @cancel="cancelCreatedContract"
                @end="endHandle"
                @create="createHandle"
            />
        </template>
        <cancel-dialog
            v-model="cancelDialog"
            :orderId="String(orderId)"
            :contractId="String(contractId)"
            :staffId="String(staffId)"
            @finish="cancelHandle"
        />
    </v-container>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import DatePicker from "@/components/commonComponent/DatePicker.vue"
import NewContractPreview from "@/components/ContractComponents/NewContractPreview.vue"
import CancelDialog from "@/components/ContractComponents/CancelDialog.vue"
import changeDigitToText from '../../mixins/money'
import contractItems from './utils/contract_items'
import provinceItems from '../../config/provinces'
import moment from 'moment'
import {getCost, getRoundFee, getInterestValue} from './utils/caculate'

const has = Object.prototype.hasOwnProperty

export default {
  name: "new-contract",
  components: {
    DatePicker,
    NewContractPreview,
    CancelDialog,
  },
  data() {
    return {
      step: 1,
      valid1: true,
      valid2: true,
      valid3: true,
      edit1: false,
      edit2: false,
      edit3: false,
      editAuthorized: false,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialogAuthorized: false,
      authorizedValid: true,
      newClient: true,
      cancelDialog: false,
      orderId: null,
      staffId: null,
      firstNameInput: '',
      lastNameInput: '',
      phone1Input: '',
      phone2Input: '',
      dobInput: '',
      nationalIdInput: '',
      searchTimer: null,
      addressInput: '',
      districtInput:'',
      cityInput: Object.keys(provinceItems)[1], //TP.HCM
      cityItems: Object.keys(provinceItems),
      genderInput: '',
      genderItems: [
        {
          text: "Nam",
          value: "male",
        },
        {
          text: "Nữ",
          value: "female",
        }
      ],
      sourceInput: '',
      assetInput: '',
      expectedAmountInput: '',
      assetTypeInput: '',
      assetTypeItems: [],
      validatorAmountInput: '',
      accessoryInput: '',
      approvedAmountInput: '',
      isAuthorizedForm: false,
      labelInput: '',
      vehicleTypeInput: '',
      chassisNumberInput: '',
      colorInput: '',
      vehicleIDInput: '',
      licensePlateInput: '',
      customer2Input: '',
      nationalId2Input: '',
      packageInput: '',
      expirationDateInput: '',
      roundingInput : '',
      contractIDInput: '',
      format: 'D-M-YYYY',
      openingDateInput: moment().format("D-M-YYYY"),
      costInput: '',
      interestRateInput: '',
      interestRateDisabled: true,
      interestValueInput: '',
      warehousingFeeInput: 0,
      methodInput: 'Tiền mặt',
      bankInput: '',
      bankItems: ['Không', 'ACB', 'Maritimebank', 'Sacombank', 'OCB', 'thêm...'],
      accountNumberInput: '',
      bankBranchInput: '',
      contract: false,
      promotionInput: '',
      dobRules: [
            value => {
                if (value !== null) {
                    const date = moment(value, this.format, true)

                    if (date.isValid()) {
                        const currentDate = moment()
                        if (currentDate.diff(date, 'years') >= 15) {
                            return true
                        } else {
                            return 'Không đủ độ tuổi'
                        }
                    }

                    return 'Ví dụ: 12-4-1998'
                }
                return 'Yêu cầu cần có'
            }
        ],
        openingDateRule: [
            value => {
                if (value !== null) {
                    const date = moment(value, this.format, true)

                    if (date.isValid()) {
                        const currentDate = moment()
                        if (currentDate > date) {
                            return true
                        } else {
                            return 'Không được chọn ngày tương lai'
                        }
                    }

                    return 'Dữ liệu không hợp lệ'
                }
                return 'Yêu cầu cần có'
            }
        ],
        autoGrowHack: false,
        autoCallRules: false,
        backTime: null,
    }
  },
  beforeCreate() {
    if (!has.call(this.$route.params, 'orderDetail')) {
      this.$router.push({name: 'homepage'})
    }
  },
  mounted() {
    this.getSAssetList()
    try {
      this.searchClient({phone: this.$route.params.orderDetail.phone})
      this.firstNameInput = this.$route.params.orderDetail.firstName
      this.lastNameInput = this.$route.params.orderDetail.lastName
      this.orderId = this.$route.params.orderDetail.orderId
      this.staffId = this.$route.params.orderDetail.staff
      this.expectedAmountInput = this.$route.params.orderDetail.expectedAmount
      this.validatorAmountInput = this.$route.params.orderDetail.validatorAmount
      this.assetTypeInput = this.$route.params.orderDetail.assetType
      this.sourceInput = this.$route.params.orderDetail.source
      
      if (has.call(this.$route.params.orderDetail, 'promotionName')) {
        this.promotionInput = this.$route.params.orderDetail.promotionName
      }

      const [asset, accessory, authorization] = this.$route.params.orderDetail.asset.split('|')
      this.assetInput = asset
      this.accessoryInput = accessory
    } catch (error) {
        
    }
    this.getProduct()
  },
  beforeDestroy() {
    this.resetContractCreatingResult()
    this.resetClientCreatingResult()
    this.resetClientUpdatingResult()
    this.resetClientSearch()
  },
  computed: {
    ...mapGetters({
        SAssetListResult: 'asset/SAssetListResult',
        CAssetUpdatingResult: 'asset/CAssetUpdatingResult',
        CAssetUpdatingErrorCode: 'asset/CAssetUpdatingErrorCode',
        CAssetUpdatingError: 'asset/CAssetUpdatingError',
        productListResult: 'product/productListResult',
        clientSearchErrorCode: 'client/clientSearchErrorCode',
        clientSearchResult: 'client/clientSearchResult',
        clientCreatingResult: 'client/clientCreatingResult',
        clientCreatingErrorCode: 'client/clientCreatingErrorCode',
        clientCreatingError: 'client/clientCreatingError',
        clientUpdatingErrorCode: 'client/clientUpdatingErrorCode',
        contractCreatingResult: 'contract/contractCreatingResult',
        contractCreatingErrorCode: 'contract/contractCreatingErrorCode',
        contractCreatingError: 'contract/contractCreatingError',
        contractApprovingErrorCode: 'contract/contractApprovingErrorCode',
        contractApprovingError: 'contract/contractApprovingError',
        contractUpadtingErrorCode: 'contract/contractUpadtingErrorCode',
        contractUpadtingError: 'contract/contractUpadtingError',
    }),
    packageItems() {
        try {
            const productDesc = Object.keys(this.productListResult)

            const [prepaidMonth, prepaidWeek, postpaidMonth, postpaidWeek] = productDesc.reduce( ([prepaidMonth, prepaidWeek, postpaidMonth, postpaidWeek], element) => {
                    const name = element.toUpperCase()
                    if (name.includes('LÃI TRƯỚC')) {
                        if (name.includes('THÁNG')) {
                            return [[...prepaidMonth, element], prepaidWeek, postpaidMonth, postpaidWeek]
                        }
                        return [prepaidMonth, [...prepaidWeek, element] , postpaidMonth, postpaidWeek]
                    }  
                    if (name.includes('THÁNG')) {
                        return [prepaidMonth, prepaidWeek, [...postpaidMonth, element], postpaidWeek]
                    }
                    return [prepaidMonth, prepaidWeek, postpaidMonth, [...postpaidWeek, element]]
                },[[], [], [], []]
            )
            return [
                ...prepaidMonth,
                ...prepaidWeek,
                ...postpaidMonth,
                ...postpaidWeek,
            ]

        } catch (error) {
            return []
        }
    },
    districtItems() {
        try {
            return provinceItems[this.cityInput]
        } catch (error) {
            return []
        }
    },
    expectedAmountHint() {
      return changeDigitToText(this.expectedAmountInput)
    },
    validatorAmountHint() {
        return changeDigitToText(this.validatorAmountInput)
    },
    approvedAmountHint() {
        return changeDigitToText(this.approvedAmountInput)
    },
    warehousingFeeHint() {
        return changeDigitToText(this.warehousingFeeInput)
    },
    roundingHint() {
        return changeDigitToText(this.roundingInput)
    },
    costHint() {
        return changeDigitToText(this.costInput)
    },
    contractTypeItems() {
        const types = []
        for (let key in contractItems) {
            types.push(contractItems[key].vi)
        }
        return types
    },
    receivedAmountHint() {
        return changeDigitToText(this.receivedAmountInput)
    },
    interestValueHint() {
        return changeDigitToText(this.interestValueInput)
    },
    receivedAmountInput() {
        try {
            return Math.round(this.costInput * 1000000 - this.warehousingFeeInput * 1000000) / 1000000
        } catch (error) {
            return null
        }
    },
    authorizedType() {
        try {
            const name = this.findAssetNameType(this.assetTypeInput)
            if (name === 'Realestate') {
                return 'Realestate'
            } else if (name === 'Bike' || name === 'Car' || name === 'Truck') {
                return 'Bike/Car'
            }
        } catch (error) {}
        
        return 'normal'
    },
    addressRules() {
        if (this.authorizedType === 'normal') {
            return [
                v => v.length <= 255 || 'Địa chỉ không quá 255 ký tự'
            ]
        }
        return [
            v => !!v || 'Yều cầu cần có',
            v => v.length <= 255 || 'Địa chỉ không quá 255 ký tự',
        ]
    },
    districtRules() {
        if (this.authorizedType !== 'normal') {
            return [v => !!v || 'Yều cầu cần có']
        }
        return []
    },
    cityRules() {
        if (this.authorizedType !== 'normal') {
            return [v => !!v || 'Yều cầu cần có']
        }
        return []
    },
    fullAddress() {
        const address = this.addressInput == '' ? '' : `${this.addressInput},`
        const district = this.districtInput == '' ? '' : `${this.districtInput},`
        return address + district + this.cityInput
    },
    contractId() {
        try {
            return this.contractCreatingResult.id
        } catch (error) {
            return null
        }
    },
  },
  watch: {
    clientSearchErrorCode() {
        if (this.clientSearchErrorCode === 200) {
            if (this.clientSearchResult !== null) {
                this.newClient = false
                this.firstNameInput = this.clientSearchResult.firstName
                this.lastNameInput = this.clientSearchResult.lastName
                this.phone1Input = this.clientSearchResult.primaryPhone

                if (this.phone1Input != this.$route.params.orderDetail.phone) {
                    this.phone2Input = this.$route.params.orderDetail.phone
                } else {
                    this.phone2Input = this.clientSearchResult.alternativePhone
                }
                
                this.dobInput = this.clientSearchResult.dateOfBirth
                this.nationalIdInput = this.clientSearchResult.nationalId
                this.addressInput = this.clientSearchResult.address
                this.districtInput = this.clientSearchResult.district
                this.cityInput = this.clientSearchResult.city
            } else {
                this.phone1Input = this.$route.params.orderDetail.phone
                
                // Not Update first name if new client
                if (this.newClient == false) {
                    this.firstNameInput = this.$route.params.orderDetail.firstName
                    if (this.firstNameInput == null) {
                        this.firstNameInput = ''
                    }
                    this.lastNameInput = this.$route.params.orderDetail.lastName
                    this.phone2Input = ''
                }

                this.newClient = true
            }
        }
    },
    //When finish call API get SAsset, Update assetTypeItems
    SAssetListResult() {
      const asset = []
      for (let item of this.SAssetListResult) {
          asset.push(item.description)
      }
      this.assetTypeItems = asset
    },
    authorizedType() {
        // First, must check to show Authorized form 
        if (this.authorizedType !== 'normal') {
            this.isAuthorizedForm = true
        }
    },
    packageInput() {
        this.interestRateInput = this.productListResult[this.packageInput].interestValue
        this.changeExpirationDate()
        this.changeCaculate()
        if (this.interestRateInput) {
            this.interestRateDisabled = true
        } else {
            this.interestRateDisabled = false
        }
    },
    openingDateInput() {
        this.changeExpirationDate()
    },
    approvedAmountInput() {
        this.changeCaculate()
    },
    interestRateInput() {
        this.changeCaculate()
    },
    validatorAmountInput() {
        this.$refs.form2_1.validate()
        this.$refs.form2_2.validate()
        this.$refs.form3_1.validate()
        this.$refs.form3_2.validate()
    },
    step() {
        this.forceReRender()
    },
  },
  methods: {
    ...mapActions({
        getSAssetList: 'asset/getSAssetList',
        getProduct: 'product/getProduct',
        searchClient: 'client/searchClient',
        createClient: 'client/createClient',
        resetClientSearch: 'client/resetClientSearch',
        updateClient: 'client/updateClient',
        resetClientCreatingResult: 'client/resetClientCreatingResult',
        resetClientUpdatingResult: 'client/resetClientUpdatingResult',
        updateCAsset: 'asset/updateCAsset',
        createContract: 'contract/createContract',
        approveContract: 'contract/approveContract',
        resetContractCreatingResult: 'contract/resetContractCreatingResult',
        updateOrder: 'order/updateOrder',
        changeStatus: 'order/changeStatus',
    }),
    forceReRender() {
      this.autoGrowHack = !this.autoGrowHack
    },
    forceReRenderApprovedAmount() {
      this.autoCallRules = !this.autoCallRules
    },
    //Find asset from asset description
    findAssetNameType(assetType) {
      for (let item of this.SAssetListResult) {
        if (item.description === assetType) {
          return item.name
        }
      }
    },
    //Back to form 1 or authorized form
    assetBackHandle() {
        if (this.authorizedType === 'normal') {
            this.step --
        } else {
            this.isAuthorizedForm = true
        }
    },
    changeCaculate() {
        if (this.interestRateInput && this.approvedAmountInput) {
            const productName = this.productListResult[this.packageInput].productName
            this.costInput = String(getCost(this.approvedAmountInput, this.interestRateInput, productName))
            this.roundingInput = String(getRoundFee(this.approvedAmountInput, this.interestRateInput, productName))
            this.interestValueInput = String(getInterestValue(this.approvedAmountInput, productName, this.costInput, this.interestRateInput))
             
        } else {
            this.costInput = '0'
            this.roundingInput = '0'
            this.interestValueInput = '0'
        }
    },
    changeExpirationDate() {
        const repayEvery = this.productListResult[this.packageInput].repayEvery
        const openingDate = moment(this.openingDateInput, this.format)
        this.expirationDateInput = openingDate.add(repayEvery, 'd').format(this.format)
    },
    cancelHandle() {
        this.$router.back()
    },
    cancelCreatedContract() {
        this.cancelDialog = true
    },
    backHandle() {
        clearTimeout(this.backTime)
        this.$router.back()
    },
    searchClientByNationalId() {
        if (this.searchTimer !== null) {
            clearTimeout(this.searchTimer)
            this.searchTimer = null
        }
        if (!this.$refs['nationalId1'].hasError | !this.$refs['nationalId2'].hasError) {
            this.searchClient({nationalId: this.nationalIdInput})
        }
    },
    search(e) {
        if (e.keyCode !== 13) {
            if (this.searchTimer !== null) {
                clearTimeout(this.searchTimer)
                this.searchTimer = null
            }
            this.searchTimer = setTimeout(() => {
                this.searchClientByNationalId()
            }, 2000)
        }
    },
    getClient: async function() {

        if (this.newClient === true) {

            // Case created client but fail create contract, no create client again
            if (this.clientCreatingErrorCode === 201) {
                return this.clientCreatingResult.id
            }

            const data = {
                firstName: this.firstNameInput,
                lastName: this.lastNameInput,
                primaryPhone: this.phone1Input,
                alternativePhone: this.phone2Input,
                address: this.addressInput,
                district: this.districtInput,
                city: this.cityInput,
                DOB: moment(this.dobInput, this.format).format("YYYY-MM-DD"),
                nationalId: this.nationalIdInput,
                gender: this.genderInput,
                submittedOnDate: moment(this.openingDateInput, this.format).format("YYYY-MM-DD"),
            }

            await this.createClient(data)

            if (this.clientCreatingErrorCode === 201) {
                return this.clientCreatingResult.id
            } else {
                this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: "Error: "+this.clientCreatingErrorCode,
                    text: this.clientCreatingError,
                });
                return null
            }
        } else if (this.clientUpdatingErrorCode !== 200) {
            // Maybe updating address client

            let changed = false
            
            if (this.addressInput !== this.clientSearchResult.address) {
                changed = true
            }

            if (this.districtInput !== this.clientSearchResult.district) {
                changed = true
            }
            
            if (this.cityInput !== this.clientSearchResult.city) {
                changed = true
            }

            if (this.dobInput !== this.clientSearchResult.dateOfBirth) {
                changed = true
            }

            if (changed) {
                const data = {
                    clientID:  this.clientSearchResult.id,
                    firstName: this.firstNameInput,
                    lastName: this.lastNameInput,
                    primaryPhone: this.phone1Input,
                    alternativePhone: this.phone2Input,
                    address: this.addressInput,
                    district: this.districtInput,
                    city: this.cityInput,
                    DOB: moment(this.dobInput, this.format).format("YYYY-MM-DD"),
                    nationalId: this.nationalIdInput,
                    gender: this.genderInput,
                }

                await this.updateClient(data)
            }
        }

        return this.clientSearchResult.id
    },
    updateAsset: async function() {
        const data = {}

        data['description'] = this.assetInput
        
        if (!/^null$|^\s*$/.test(this.accessoryInput) && this.accessoryInput !== undefined) {
            data['description'] += `|${this.accessoryInput}`
        } else {
            data['description'] += '|'
        }

        if (this.authorizedType === 'Bike/Car') {
            data['description'] += `|Nhãn hiệu:${this.labelInput}-Dòng xe:${this.vehicleTypeInput}-Số khung:${this.chassisNumberInput}-Màu sơn:${this.colorInput}-Số máy:${this.vehicleIDInput}-Biển số đăng ký:${this.licensePlateInput}`
        } else {
            data['description'] += '|'
        }

        await this.updateCAsset({
            id: this.$route.params.orderDetail.assetID,
            data: data,
        })
        if (this.CAssetUpdatingErrorCode == 200) {
            return true
        } else {
            this.$notify({
                group: 'foo',
                type: 'error',
                title: "Error: "+this.CAssetUpdatingErrorCode,
                text: this.CAssetUpdatingError,
            });
            return false
        }
    },
    createHandle: async function() {
        
        const promise1 = new Promise((resolve, reject) => {
            this.getClient().then(clientID => {
                resolve(clientID)
            })
        });

        const promise2 = new Promise((resolve, reject) => {
            this.updateAsset().then(assetUpdate => {
                resolve(assetUpdate)
            })
        });

        const [clientID, assetUpdate] = await Promise.all([promise1, promise2])

        if (clientID === null || assetUpdate === false) {
            return
        }

        const data = {
            orderID: this.orderId,
            clientID: clientID,
            productID: this.productListResult[this.packageInput].id,
            expectedAmount: parseFloat(this.expectedAmountInput),
            validatorAmount: parseFloat(this.validatorAmountInput),
            approvedAmount: parseFloat(this.approvedAmountInput),
            interestRate: parseFloat(this.interestRateInput),
            warehousingFee: parseFloat(this.warehousingFeeInput) || 0,
            openingDate: moment(this.openingDateInput, this.format).format("YYYY-MM-DD"),
            expirationDate: moment(this.expirationDateInput, this.format).format("YYYY-MM-DD"),
        }

        this.createContract(data).then(() => {
            if (this.contractCreatingErrorCode === 201) {
                this.$notify({
                    group: 'foo',
                    type: 'success',
                    title: "Tạo hợp đồng thành công",
                    text: ''
                });

            } else {
                this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: "Error: "+this.contractCreatingErrorCode,
                    text: this.contractCreatingError
                });
            }
        })

        const orderData = {
            orderID: this.orderId,
            phone: this.phone1Input,
            name: this.lastNameInput,
        }
        this.updateOrder(orderData)
    },
    endHandle() {
        this.contract = false
        this.approveContract({
            contractId: this.contractId,
            approvementDate: moment(this.openingDateInput, this.format).format("YYYY-MM-DD"),
        }).then(() => {
            if (this.contractApprovingErrorCode === 200) {
                this.$notify({
                    group: 'foo',
                    type: 'success',
                    title: "Approve hợp đồng thành công",
                    text: ''
                })

                // Change order status to success
                this.changeStatus({
                    orderId: this.orderId,
                    step: 'Contract',
                    stage: 'Active Contract',
                    status: 'Success',
                    staff: this.staffId,
                })
            } else {
                this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: "Error: "+this.contractApprovingErrorCode,
                    text: this.contractApprovingError,
                })
            }
        })
        this.backTime = setTimeout(() => {
            this.backHandle()
        }, 5000)
        this.step ++
    },
  }
}
</script>
<style scoped>
.background {
    background-color: #F0F0F7;
}
.step {
    padding-top: 0px;
}
.title {
    padding-top: 20px;
}
.padding {
    padding-left: 95px;
    padding-right: 95px;
    background-color: #ffffff;
    border-style: solid;
}
.title-form {
    font-size: 28px;
    color: #43425D;
    text-decoration: underline;
    font-weight: bold;
}
.form {
    background-color: #ffffff;
    border-style: solid;
}
.yesBtn {
    color: #ffff !important;
}
.backBtn {
  color: #dd1e26 !important;
}
.nextBtn {
  color: #ffff !important;
}
.cancelBtn {
  color: #fff !important;
}
.edit {
    font-size: 18px;
    color: #4D4F5C;
}
.content-success {
    color: #4D4F5C;
    font-size: 70px;
}
</style>