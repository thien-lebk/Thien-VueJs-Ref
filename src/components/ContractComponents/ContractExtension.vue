<template>
    <v-container fluid class="pa-0 ma-2">
        <v-layout row>
            <v-flex md5 class="title">
                <h2>Gia hạn - Hợp đồng mới</h2>
                <!-- <h3>Contract #123456</h3> -->
            </v-flex>
            <v-spacer/>
            <v-flex md4>
                <v-stepper alt-labels v-model="step" class="elevation-0 background">
                    <v-stepper-header>
                        <template v-for="index in 2" class="step">
                            <v-stepper-step :step="index" color="#dd1e26" :key="`step-${index}`">Step {{index}}</v-stepper-step>
                            <v-divider v-if="index !== 2" :key="`divider-${index}`"/>
                        </template>
                    </v-stepper-header>
                </v-stepper>
            </v-flex>
        </v-layout>
        <v-window v-model="step">
            <v-window-item :value="1">
                <v-form v-model="valid1" class="form-customer">
                    <v-flex md12 class="title-form">
                        <h2 style="font-weight: bold">Thông Tin Khách Hàng</h2>
                    </v-flex>
                    <v-container :style="{'padding-top': '0px'}">
                        <v-layout>
                            <v-flex class="header-form header-form-lef">
                                <v-subheader class="input-header">Họ và tên<span class="required">*</span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model.lazy="nameInput"
                                    placeholder="Exp : Pham Le David"
                                    outlined
                                    :readonly="!edit1"
                                >
                                </v-text-field>
                            </v-flex>
                            <v-spacer class="space"/>
                            <v-flex class="header-form" >
                                <v-subheader class="input-header">Email</v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model.lazy="emailInput"
                                    placeholder="Exp : adress@gmail.com"
                                    outlined
                                    :readonly="!edit1"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                             <v-flex class="header-form header-form-lef">
                                <v-subheader class="input-header">Phone 1<span class="required">*</span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model.lazy="phone1Input"
                                    :rules="[
                                        v => !!v || 'Yêu cầu cần có',
                                        //Phone has charater pre '+' (only one or no), from 10-13 digits.
                                        v => /^[+]?[0-9]{10,13}$/.test(v) || 'Dữ liệu không hợp lệ'
                                    ]"
                                    placeholder="Exp : 0989004630"
                                    outlined
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                            <v-spacer class="space"/>
                            <v-flex class="header-form" >
                                <v-subheader class="input-header">Phone 2<span class="required"></span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model.lazy="phone2Input"
                                    placeholder="Exp : 0989004630"
                                    outlined
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex class="header-form header-form-lef">
                                <v-subheader  class="input-header">Ngày sinh<span class="required">*</span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <date-picker
                                v-model="dobInput" 
                                placeholder="dd/mm/yyyy"
                                :readonly="!edit1"
                                :rules="dobRules"
                            />
                            </v-flex>
                            <v-spacer class="space"/>
                            <v-flex class="header-form" >
                                <v-subheader class="input-header">CMND</v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model.lazy="nationalIdInput"
                                    placeholder="Exp : 0212312321"
                                    :readonly="!edit1"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex class="header-form header-form-lef">
                                <v-subheader  class="input-header">Địa chỉ</v-subheader>
                            </v-flex>
                            <v-flex style="max-width: 86%">
                                <v-text-field
                                    v-model.lazy="addressInput"
                                    placeholder="Exp : Số nhà, đường"
                                    outlined
                                    :readonly="!edit1"
                                >
                                </v-text-field>
                            </v-flex>
                         </v-layout>
                        <v-layout>
                            <v-flex class="header-form header-form-lef">
                                <v-subheader  class="input-header">Quận/Huyện</v-subheader>
                            </v-flex>
                            <v-flex sm3 class="select-fix-height">
                                <v-select
                                    v-model="districtInput"
                                    item-value="districtInput"
                                    :items="districtItems"
                                    outline
                                    :readonly="!edit1"
                                >
                                </v-select>
                            </v-flex>
                            <v-spacer class="space"/>
                            <v-flex class="header-form" >
                                <v-subheader class="input-header">Thành phố</v-subheader>
                            </v-flex>
                            <v-flex sm3 class="select-fix-height">
                                <v-select
                                    v-model="cityInput"
                                    item-value="cityInput"
                                    :items="cityItems"
                                    outline
                                    :readonly="!edit1"
                                >
                                </v-select>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex class="header-form header-form-lef">
                                <v-subheader  class="input-header">Source</v-subheader>
                            </v-flex>
                            <v-flex xs12 sm3 class="select-fix-height">
                                <v-text-field
                                    v-model.lazy="sourceInput"
                                    outlined
                                    :readonly="true"
                                >
                                </v-text-field>
                            </v-flex>
                            <v-spacer class="space"/>
                            <v-flex class="header-form" >
                                <v-subheader class="input-header">Note</v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-textarea
                                    v-model.lazy="noteInput"
                                    rows="1"
                                    :readonly="!edit1"
                                    >
                                </v-textarea>
                            </v-flex>
                        </v-layout>
                        <v-layout
                            align-center
                            justify-end
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
                                            :readonly="!edit1"
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
                <v-form v-model="valid2" class="form-customer">
                    <v-flex md12 class="title-form">
                        <h2 style="font-weight: bold">Thông Tin Tài Sản</h2>
                    </v-flex>
                    <v-container>
                        <v-layout>
                            <v-flex class="header-form header-form-lef">
                                <v-subheader class="input-header">Mô tả tài sản<span class="required">*</span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-textarea
                                    v-model.lazy="assetInput"
                                    rows="1"
                                    auto-grow
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    outlined
                                    readonly
                                >
                                </v-textarea>
                            </v-flex>
                            <v-spacer class="space"/>
                            <v-flex class="header-form" >
                                <v-subheader class="input-header">Giá mong muốn</v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model="expectedAmountInput"
                                    :rules="[
                                        v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                    ]"
                                    label="Giá mong muốn"
                                    :hint="this.expectedAmountHint"
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex class="header-form header-form-lef">
                                <v-subheader class="input-header">Loại tài sản<span class="required">*</span></v-subheader>
                            </v-flex>
                            <v-flex sm3 class="select-fix-height">
                                <v-select
                                    v-model="assetTypeInput"
                                    :items="assetTypeItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    outline
                                    readonly
                                >
                                </v-select>
                            </v-flex>
                            <v-spacer class="space"/>
                            <v-flex class="header-form" >
                                <v-subheader class="input-header">Giá thẩm định</v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model="validatorAmount1Input"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    placeholder="Giá thẩm định"
                                    :hint="this.validatorAmount1Hint"
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex class="header-form header-form-lef">
                                <v-subheader class="input-header">Note</v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model="validatorAmount2Input"
                                    placeholder="Note"
                                    :hint="this.validatorAmount2Hint"
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                            <v-spacer class="space"/>
                            <v-flex class="header-form" >
                                <v-subheader class="input-header">Giá cầm</v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model="pawnAmountInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ',
                                           
                                        ]"
                                    placeholder="Giá cầm"
                                    :hint="this.pawnAmountHint"
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-form>
                <br/>
                <v-form v-model="valid3" ref="form3" class="form-customer">
                    <v-flex md12 class="title-form">
                        <h2 style="font-weight: bold">Contract Info</h2>
                    </v-flex>
                    <v-container>
                        <v-layout>
                            <v-flex class="header-form header-form-lef">
                                <v-subheader class="input-header">Mã HĐ Cũ<span class="required"></span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model.lazy="contractIdInput"
                                    placeholder="Mã hợp đồng"
                                    :readonly="true"
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex class="header-form header-form-lef">
                                <v-subheader class="input-header">Ngày mở HĐ<span class="required">*</span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <date-picker 
                                    v-model="openingDateInput" 
                                    :format="format"
                                    :rules="openingDateRule"
                                />
                            </v-flex>
                            <v-flex class="header-form" >
                                <v-subheader class="input-header">Nợ HĐ cũ</v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model="penaltyChargesCharged"
                                    :readonly="true"
                                    :hint="penaltyChargesChargedHint"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                             <v-flex class="header-form header-form-lef">
                                <v-subheader class="input-header">Gói<span class="required">*</span></v-subheader>
                            </v-flex>
                            <v-flex sm3 class="select-fix-height">
                                <v-select
                                    v-model="packageInput"
                                    :items="packageItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    outline
                                >
                                </v-select>
                            </v-flex>
                            <v-flex class="header-form" >
                                <v-subheader class="input-header">Ngày hết hạn HĐ<span class="required">*</span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <date-picker v-model="expirationDateInput" :format="format" placeholder="Ngày hết hạn hợp đồng*"/>
                            </v-flex>
                            <v-flex class="header-form" >
                                <v-subheader class="input-header">Lãi trễ</v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model="overdueFeeInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Lãi trễ"
                                    :hint="this.overdueFeeHint"
                                    persistent-hint
                                    :readonly="true"
                                    
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex class="header-form header-form-lef">
                                <v-subheader class="input-header">Lãi Suất<span class="required">*</span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model="interestRateInput"
                                     :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => {
                                                if (v>0 && v<=9) {
                                                    return true
                                                } return 'Lãi suất phải nằm từ 0 đến 9%'
                                            }
                                        ]"
                                    placeholder="Lãi Suất"
                                    :disabled="interestRateDisabled"
                                    
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex class="header-form header-form-lef">
                                <v-subheader class="input-header">Giá cầm<span class="required">*</span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model="approvedAmountInput"  
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ',
                                        ]"
                                    placeholder="Giá cầm*"
                                    :hint="approvedAmountHint"
                                    required
                                    :readonly="true"
                                    persistent-hint
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex>
                                <v-subheader class="input-header">Phí bãi xe</v-subheader>
                            </v-flex>
                            <v-flex sm3 style="display: flex;">
                                <v-text-field
                                    v-model="warehousingFeeInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    placeholder="Phí bãi xe"
                                    :hint="warehousingFeeHint"
                                    persistent-hint
                                    
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex class="header-form" >
                                <v-subheader class="input-header">Tiền giảm<span class="required"></span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model="interestDiscountInput"
                                    required
                                    :hint="interestDiscountHint"
                                    persistent-hint
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex class="header-form header-form-lef">
                                <v-subheader class="input-header">Gốc<span class="required">*</span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model="costInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    placeholder="Gốc*"
                                    :hint="costHint"
                                    persistent-hint
                                    readonly
                                    required>
                                </v-text-field>
                            </v-flex>
                            <v-flex class="header-form header-form-lef">
                                <v-subheader class="input-header">Đã trả trước<span class="required">*</span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model="totalRepayment"
                                    placeholder="Đã trả trước"
                                    required
                                    :hint="totalRepaymentHint"
                                    persistent-hint
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex class="header-form header-form-lef">
                                <v-subheader class="input-header">Rớt giá<span class="required"></span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model="diffAmountInput"
                                    placeholder="Rớt giá"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ',
                                            v => {
                                                if (parseFloat(v) > pawnAmountInput) {
                                                    return 'Không được lớn hơn giá cầm'
                                                }
                                                return true
                                            },
                                            v => {
                                                if (parseFloat(v) < 0 || v === '') {
                                                    return 'Rớt giá phải lớn hơn hoặc bằng 0'
                                                }
                                                return true
                                            },
                                        ]"
                                    :hint="downCost"
                                    persistent-hint
                                    required>
                                </v-text-field>
                            </v-flex>
                            <v-flex class="header-form header-form-lef">
                                <v-subheader class="input-header">Tiền lãi<span class="required">*</span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model="interestValueInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    placeholder="Tiền lãi"
                                    :hint="interestValueHint"
                                    persistent-hint
                                    :readonly="true"    
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex class="header-form" >
                                <v-subheader class="input-header">Tiền khách phải trả<span class="required">*</span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model="owedInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    placeholder="Tiền khách phải trả"
                                    required
                                    :hint="owedInputHint"
                                    persistent-hint
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex class="header-form header-form-lef">
                                <!-- <v-subheader class="input-header">Ngân hàng<span class="required">*</span></v-subheader> -->
                            </v-flex>
                            <v-flex sm3 class="select-fix-height">
                                <!-- <v-select
                                    v-model="bankInput"
                                    :items="bankItems"
                                    :disabled="methodInput == 'Tiền Mặt'"
                                    outline
                                >
                                </v-select> -->
                            </v-flex>
                            <v-flex class="header-form header-form-lef">
                                <!-- <v-subheader class="input-header">Số tài khoản<span class="required">*</span></v-subheader> -->
                            </v-flex>
                            <v-flex sm3>
                                <!-- <v-text-field
                                    v-model="accountNumberInput"
                                    :rules="[
                                            v => /^\d*$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Số tài khoản"
                                    :disabled="methodInput == 'Tiền Mặt'"
                                >
                                </v-text-field> -->
                            </v-flex>
                            <v-flex class="header-form">
                                <v-subheader class="input-header">Tổng tiền thu được</v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model="receivedAmountInput"
                                    :rules="[
                                        v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ',
                                        v => {
                                            if (parseFloat(v) + totalRepayment <= parseFloat(diffAmountInput)  ) {
                                                return 'Tiền nhận được không thể ít hơn tiền rớt giá'
                                            }
                                            return true
                                        },
                                        v => {
                                            if (parseFloat(v) > parseFloat(this.owedInput)) {
                                                return 'Số tiền thu được không được lớn hơn tiền khách phải trả'
                                            }
                                            return true
                                        },
                                    ]"
                                    label="Tổng tiền thu được"
                                    :hint="this.receivedAmountHint"
                                    persistent-hint
                                    
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex class="header-form header-form-lef">
                                <!-- <v-subheader class="input-header">Chi Nhánh/PGD</v-subheader> -->
                            </v-flex>
                            <v-flex sm8>
                                <!-- <v-text-field
                                    v-model="bankBranchInput"
                                    label="Chi Nhánh/PGD"
                                    :disabled="methodInput == 'Tiền Mặt'"
                                >
                                </v-text-field> -->
                            </v-flex>
                            <v-flex class="header-form">
                            </v-flex>
                            <v-flex sm2>
                            </v-flex>
                        </v-layout>
                        <v-layout
                            align-center
                            justify-end
                            v-show="!edit1"
                        >
                            <v-btn
                                class="cancelBtn"
                                color="#808495"
                                round
                                @click="cancelHandle"
                            >
                                Cancel
                            </v-btn>
                            <v-btn class="nextBtn"
                                color="#dd1e26"
                                round
                                @click="step++"
                                :disabled="!(valid3 && valid1)"
                            >
                                Confirm
                            </v-btn>
                        </v-layout>
                    </v-container>
                </v-form>
            </v-window-item>
      <v-window-item :value="2">
        <contract-extent-preview v-if="endExtent === false"
            :contractType="authorizedType"
            :clientId="String(customerMifosId)"
            :oldLoanId="contractIdInput"
            :customerName="nameInput"
            :phoneNumber="phone1Input"
            :birthDay="dobInput"
            :nationalId="nationalIdInput"
            :address="addressInput"
            :asset="assetTypeInput"
            :description="description"
            :accessory="accessory"
            :method="methodInput"
            :approvedAmount="parseFloat(approvedAmountInput)"
            :transactionDate="openingDateInput"
            :expirationDate="expirationDateInput"
            :interestRate="parseFloat(interestRateInput)"
            :fee="parseFloat(warehousingFeeInput)"
            :owed="parseFloat(receivedAmountInput)"
            :productName="productName"
            :interestDiscount="parseFloat(interestDiscountInput)"
            :repayEvery="repayEvery"
            :cost="parseFloat(costInput)"
            :interestValue="parseFloat(interestValueInput)"
            @back="step--" 
            @cancel="cancelCreatedContract"
            @end="endHandle"
            @create="createHandle"
        />
        <v-layout v-if="endExtent === true" class="form">
            <center>
                <v-icon size="150" color="#157F1F">check_circle</v-icon>
                <br/>
                <strong class="content-success">HOÀN THÀNH GIA HẠN</strong>
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
        </v-layout>
      </v-window-item>
    </v-window>
    </v-container>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import DatePicker from "@/components/commonComponent/DatePicker.vue"
import ContractExtensionPreview from './ContractExtensionPreview.vue'
import changeDigitToText from '../../mixins/money'
import provinceItems from '../../config/provinces'
import contractItems from './utils/contract_items'
import { isNullOrUndefined } from 'util'
import moment from 'moment'
import {getCost, getRoundFee, getInterestValue, getInterestDiscountValue} from './utils/caculate'

export default {
  name: "extension-contract",
  components: {
    DatePicker,
    'contract-extent-preview': ContractExtensionPreview,
  },
  data() {
    return {
      step: 1,
      newCustomer: true,
      valid1: true,
      valid2: true,
      valid3: true,
      edit1: false,
      dialog1: false,
      nameInput: '',
      emailInput: '',
      phone1Input: '',
      phone2Input: '',
      dobInput: '',
      nationalIdInput: '',
      addressInput: '',
      districtInput:'',
      cityInput: Object.keys(provinceItems)[0], //TP.HCM
      cityItems: Object.keys(provinceItems),
      sourceInput: '',
      noteInput: '',
      assetInput: '',
      description: '',
      accessory: '',
      expectedAmountInput: '',
      assetTypeInput: '',
      assetTypeItems: [],
      validatorAmount1Input: '',
      validatorAmount2Input: '',
      pawnAmountInput: '',
      contractIdInput: '',
      receivedAmountInput: 0,
      packageInput: '',
      openingDateInput: moment().format("D-M-YYYY"),
      format: 'D-M-YYYY',
      costInput: '',
      pawnPriceInput: '',
      interestValueInput: '',
      interestValueOld: 0,
      warehousingFeeCheck: false,
      warehousingFeeInput: 0,
      appraisalFeeCheck: false,
      appraisalFeeInput: '',
      notaryFeeCheck: false,
      notaryFeeInput: '',
      anotherFeeCheck: false,
      anotherFeeInput: '',
      methodInput: 'Tiền Mặt',
      bankInput: '',
      bankItems: ['Không', 'ACB', 'Maritimebank', 'Sacombank', 'OCB', 'thêm...'],
      accountNumberInput: '',
      bankBranchInput: '',
      interestRateInput: '',
      productId: 0,
      diffAmountInput: 0,
      approvedAmountInput: '',
      totalRepayment: 0,
      penaltyChargesCharged: 0,
      totalWaived: 0,
      interestCharged: 0,
      feeChargesCharged: 0,
      interestRateDisabled: true,
      clientId: '',
      orderID: '',
      productName: '',
      endExtent: false,
      customerMifosId: '',
      interestDiscountInput: 0,
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
    }
  },
  mounted() {
    this.getCustomerInfo()
    this.getSAssetList()
  },
  beforeDestroy() {
    this.resetContractCreatingResult()
    this.resetClientUpdatingResult()
  },
  computed: {
    ...mapGetters({
        summaryDetailResult: 'contract/summaryDetailResult',
        summaryDetailRequest: 'contract/summaryDetailRequest',
        summaryDetailErrorCode: 'contract/summaryDetailErrorCode',
        contractTotalSummaryResult: 'contract/contractTotalSummaryResult',
        SAssetListResult: 'asset/SAssetListResult',
        productListResult: 'product/productListResult',
        contractDetail: 'contract/contractDetail',
        contractDetailErrorCode: 'contract/contractDetailErrorCode',
        contractDetailError: 'contract/contractDetailError',
        clientDetailResult: 'client/clientDetailResult',
        contractCreatingResult: 'contract/contractCreatingResult',
        contractCreatingErrorCode: 'contract/contractCreatingErrorCode',
        contractCreatingError: 'contract/contractCreatingError',
        contractUpadtingErrorCode: 'contract/contractUpadtingErrorCode',
        contractUpadtingError: 'contract/contractUpadtingError',
        orderDetail: 'order/orderDetail',
        promotionDetail: 'promotion/promotionDetail',
        promotionDetailErrorCode: 'promotion/promotionDetailErrorCode',
    }),
    contractId() { 
        return String(this.$route.params.id);
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
    packageItems() {
        try {
            let productName = this.productListResult[this.packageInput].productName
            if (productName.includes('Prepaid Interest')) {
                productName = 'Prepaid Interest'
            } else {
                productName = 'Postpaid Interest'
            }

            const productDesc = Object.keys(this.productListResult).filter(key => 
                this.productListResult[key].productName.includes(productName)
            )

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
    oldCustomer: {
        get() {return !this.newCustomer},
        set(value) {this.newCustomer = !value}
    },
    expectedAmountHint() {
      return changeDigitToText(this.expectedAmountInput)
    },
    validatorAmount1Hint() {
        return changeDigitToText(this.validatorAmount1Input)
    },
    validatorAmount2Hint() {
        return changeDigitToText(this.validatorAmount2Input)
    },
    pawnAmountHint() {
        return changeDigitToText(this.pawnAmountInput)
    },
    approvedAmountHint() {
        return changeDigitToText(this.approvedAmountInput)
    },
    interestValueHint() {
        return changeDigitToText(this.interestValueInput)
    },
    warehousingFeeHint() {
        return changeDigitToText(this.warehousingFeeInput)
    },
    overdueFeeHint() {
        return changeDigitToText(this.overdueFeeInput)
    },
    costHint() {
        return changeDigitToText(this.costInput)
    },
    owedInputHint() {
        return changeDigitToText(this.owedInput)
    },
    downCost() {
        return changeDigitToText(this.diffAmountInput)
    },
    penaltyChargesChargedHint() {
        return changeDigitToText(this.penaltyChargesCharged)
    },
    totalRepaymentHint() {
        return changeDigitToText(this.totalRepayment)
    },
    interestDiscountHint() {
        return changeDigitToText(this.interestDiscountInput)
    },
    contractTypeItems() {
        const types = []
        for (let key in contractItems) {
            types.push(contractItems[key].vi)
        }
        return types
    },
    owedInput() {
       try {
            const productName = this.productListResult[this.packageInput].productName
            if (productName.includes('Prepaid Interest')) {
                return this.toFixed(parseFloat(this.overdueFeeInput) + parseFloat(this.interestValueInput)
                        + parseFloat(this.diffAmountInput) + parseFloat(this.warehousingFeeInput) 
                        - parseFloat(this.totalRepayment) + parseFloat(this.penaltyChargesCharged) 
                        - parseFloat(this.totalWaived) - parseFloat(this.interestDiscountInput), 3)
            } else {
                return this.toFixed(parseFloat(this.overdueFeeInput) + parseFloat(this.interestValueOld) 
                        + parseFloat(this.diffAmountInput) + parseFloat(this.warehousingFeeInput) 
                        - parseFloat(this.totalRepayment) + parseFloat(this.penaltyChargesCharged) - parseFloat(this.totalWaived) 
                        - parseFloat(this.interestDiscountInput), 3)
            }
            
         } catch (error) {
            return 0
        } 
    },
    receivedAmountHint() {
        return changeDigitToText(this.receivedAmountInput)
    },
    feeInput() {
        try {
            const warehousingFee = this.warehousingFeeCheck ? Number.parseInt(this.warehousingFeeInput) || 0 : 0
            const appraisalFee = this.appraisalFeeCheck ? Number.parseInt(this.appraisalFeeInput) || 0 : 0
            const notaryFee = this.notaryFeeCheck ? Number.parseInt(this.notaryFeeInput) || 0 : 0
            const anotherFee = this.anotherFeeCheck ? Number.parseInt(this.anotherFeeInput) || 0 : 0
            return warehousingFee + appraisalFee + notaryFee + anotherFee
        } catch (error) {
            return ''
        }
    },
    repayEvery() {
        try {
            return this.productListResult[this.packageInput].repayEvery
        } catch (error) {
            return null
        }
    },
    expirationDateInput() {
        try {
            const repayEvery = this.productListResult[this.packageInput].repayEvery
            const openingDate = moment(this.openingDateInput, this.format)
            const dueDate = moment(this.contractDetail.dueDate, this.format)

            const date = openingDate < dueDate ? dueDate : openingDate

            return date.add(repayEvery, 'd').format(this.format)
        } catch (error) {
            return null
        }
    },
    overdueFeeInput() {
        try {
            const everday = this.productListResult[this.contractDetail.productDesc].repayEvery
            const lateDay = this.diffDate(this.openingDateInput,this.contractDetail.dueDate)
            const lateChanger = isNullOrUndefined(this.summaryDetailResult) ? 0 : this.summaryDetailResult.interestCharged/1000000
            const lateInterest = lateChanger * lateDay / everday
            if (lateInterest === 0) {
                return '0'
            } else {
                return String(this.toFixed(Math.round(lateInterest * 1000)/1000, 3))
            }
        } catch (error) {
            return null
        }
        
    },
    oldContractCharge() {
        const productName = this.productListResult[this.packageInput].productName
        
        let interestValue = this.interestValueOld
        if (productName.includes('Prepaid Interest')) {
            interestValue = this.interestValueInput
        }

        const value = (Math.round(this.receivedAmountInput * 1000) - Math.round(this.warehousingFeeInput * 1000)) +  Math.round(this.totalRepayment * 1000) - Math.round(interestValue * 1000) - Math.round(this.penaltyChargesCharged * 1000) + Math.round(this.totalWaived * 1000)
        if (this.owedInput <= this.receivedAmountInput) {
            return parseFloat(this.overdueFeeInput)
        } else if (parseFloat(this.diffAmountInput) > 0 ) {
            return (value - Math.round(this.diffAmountInput * 1000)) / 1000
        } else {
            return value / 1000
        }
    },
  },
  watch: {
    step() {
        window.scrollTo(0,0)
    },
    //When finish call API get SAsset, Update assetTypeItems
    SAssetListResult() {
      const asset = []
      for (let item of this.SAssetListResult) {
        asset.push(item.description)
      }
      this.assetTypeItems = asset
    },
    packageInput() {
        this.interestRateInput = this.productListResult[this.packageInput].interestValue
        if (this.interestRateInput) {
            this.interestRateDisabled = true
        } else {
            this.interestRateDisabled = false
            try {
                this.interestRateInput = this.contractDetail.interestValue
            } catch (error) {  }
        }
    },
    diffAmountInput() {
        if (parseFloat(this.diffAmountInput) >= 0 && parseFloat(this.diffAmountInput) <  this.pawnAmountInput) {
            this.approvedAmountInput = this.toFixed(this.pawnPriceInput - this.diffAmountInput , 3)
        } else {
            this.diffAmountInput = 0
            this.approvedAmountInput =  this.toFixed(this.pawnPriceInput - this.diffAmountInput , 3)
        }
        this.changeCaculate()
    },
    interestRateInput() {
        this.changeCaculate()
    },
    owedInput() {
        this.$refs.form3.validate()
    },
    receivedAmountInput() {
        this.$refs.form3.validate()
    },
  },
  methods: {
    ...mapActions({
        getSAssetList: 'asset/getSAssetList',
        getProduct: 'product/getProduct',
        getProductById: 'product/getProductById',
        getContractByContractId: 'contract/getContractByContractId',
        getClientById: 'client/getClientById',
        getContractSummary: 'contract/getContractSummary',
        createContract: 'contract/createContract',
        updateContract: 'contract/updateContract',
        cancelContract: 'contract/cancelContract',
        resetContractCreatingResult: 'contract/resetContractCreatingResult',
        updateClient: 'client/updateClient',
        resetClientUpdatingResult: 'client/resetClientUpdatingResult',
        getOrderDetailById: 'order/getOrderDetailById',
        getPromotionById: 'promotion/getPromotionById',
    }),
    cancelHandle() {
        if (isNullOrUndefined(this.contractId) === false) {
          this.$router.push({name: 'contract-detail', params: {id: this.contractId}});
        }
    },
    changeCaculate() {
        if (this.interestRateInput && this.approvedAmountInput) {
            this.productName = this.productListResult[this.packageInput].productName
            this.costInput = this.toFixed(getCost(this.approvedAmountInput, this.interestRateInput, this.productName), 3)
            this.interestValueInput = this.toFixed(getInterestValue(this.approvedAmountInput, this.productName, this.costInput, this.interestRateInput),3)
        } else {
            this.costInput = '0'
            this.interestValueInput =  this.interestValueOld
        }
    },
    async getCustomerInfo() {
        this.getProduct()
        await Promise.all([this.getContractSummary({id: this.contractId}), this.getContractByContractId({id: this.contractId})])

        if (this.summaryDetailErrorCode === 200 ) {
            if (!isNullOrUndefined(this.summaryDetailResult)) {
                this.totalRepayment = this.summaryDetailResult.totalRepayment/1000000
                this.totalWaived = this.summaryDetailResult.totalWaived/1000000
                this.penaltyChargesCharged = this.summaryDetailResult.penaltyChargesCharged/1000000
                this.interestCharged = this.summaryDetailResult.interestCharged/1000000
                this.feeChargesCharged = this.summaryDetailResult.feeChargesCharged/1000000
            }
        } else {
            this.$router.push({name: 'contract'})
            this.$notify({
                group: 'foo',
                type: 'error',
                title: "Error: "+this.summaryDetailErrorCode,
                text: "Hợp đồng chưa active"
            })
        }

        if (this.contractDetailErrorCode === 200) {
                
            if (this.contractDetail.status === 'Closed') {
                this.$router.push({name: 'contract'})
                this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: "Error: 503",
                    text: "Hợp đồng đã đóng"
                })
            }

            this.contractIdInput = String(this.contractDetail.loanId)
            this.orderID = this.contractDetail.order
            this.assetInput = this.contractDetail.assetDescription

            const [asset, accessory, authorization] = this.assetInput.split('|')
            if (!/^null$|^\s*$/.test(authorization) && authorization !== undefined) {
                if (!/^null$|^\s*$/.test(asset)) {
                    this.description = `${asset} | ${authorization}`
                } else {
                    // Maybe car, motorbike have no asset
                    this.description = authorization
                }
            } else {
                this.description = asset
            }

            this.accessory = accessory
            this.clientId = String(this.contractDetail.clientId)
            this.expectedAmountInput = this.contractDetail.requiredAmount
            this.assetTypeInput = this.contractDetail.assetType
            this.validatorAmount1Input = this.contractDetail.proposedAmount
            this.validatorAmount2Input = this.contractDetail.description
            this.packageInput =  this.contractDetail.productDesc
            this.validatorAmount2Input =  this.contractDetail.note
            this.warehousingFeeInput = this.contractDetail.warehousingFee
            // Rớt giá
            this.diffAmountInput = isNullOrUndefined(this.contractDetail.diffAmount) ? 0 : this.toFixed(this.contractDetail.diffAmount, 3)
            // Giá cầm
            this.pawnPriceInput = this.contractDetail.approvedAmount
            this.pawnAmountInput = this.contractDetail.approvedAmount
            this.approvedAmountInput = this.toFixed(this.pawnPriceInput - this.diffAmountInput, 3)
            // Lãi suất
            this.interestRateInput = this.contractDetail.interestValue,
            this.interestValueOld = String(getInterestValue(this.contractDetail.approvedAmount, this.contractDetail.productDesc,
                        this.diffAmountInput, this.contractDetail.interestValue))
            this.interestValueInput = this.interestValueOld     

            this.getOrderDetailById({id: this.orderID}).then(() => {
                if (!isNullOrUndefined(this.orderDetail)) {
                    this.sourceInput = this.orderDetail.source
                }
            })

            this.getClientById({id: String(this.clientId)}).then(() => {
                if (!isNullOrUndefined(this.clientDetailResult)) {
                    this.customerMifosId =  String(this.clientDetailResult.mifosId)
                    this.nameInput = this.clientDetailResult.fullName
                    this.emailInput = this.clientDetailResult.email
                    this.phone1Input = this.clientDetailResult.primaryPhone
                    this.phone2Input = this.clientDetailResult.alternativePhone
                    this.dobInput =  moment(this.clientDetailResult.dateOfBirth, 'DD-MM-YYYY').format(this.format)
                    this.nationalIdInput = this.clientDetailResult.nationalId
                    this.addressInput = this.clientDetailResult.address
                    this.districtInput = this.clientDetailResult.district
                    this.cityInput = this.clientDetailResult.city
                    this.noteInput = this.clientDetailResult.note
                }
            })

            // Contract had promotion
            if (!isNullOrUndefined(this.contractDetail.promotion)) {
                this.getPromotionById({id:this.contractDetail.promotion}).then(() => {
                    if (this.promotionDetailErrorCode === 200) {
                        this.interestDiscountInput = getInterestDiscountValue({
                            approvedAmount: this.pawnAmountInput,
                            interestValue: this.interestValueOld,
                            interestDiscount: this.promotionDetail.interestDiscount,
                            maxDiscount: this.promotionDetail.maxDiscount,
                            minDiscount: this.promotionDetail.minDiscount,
                            minPayout: this.promotionDetail.minPayout,
                        })
                    }
                })
            }
        } else {
            this.$router.push({name: 'contract'})
            this.$notify({
                group: 'foo',
                type: 'error',
                title: "Error: "+this.contractDetailErrorCode,
                text: this.contractDetailError,
            })
        }
            
    },
    diffDate(date1, date2) {
        const dt1 = moment(date1, this.format)
        const dt2 = moment(date2, this.format)
        if (dt2 > dt1) {
            return 0
        }
        return dt1.diff(dt2, 'days')
    },

    updateAsset: async function() {
        const data = {}
    
        data['description'] =this.assetInput
 
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

    updateClientHanle: async function() {

        const nameArr = this.nameInput.split(' ')

        const data = {
            clientID:  this.clientId,
            firstName: nameArr[0],
            lastName: this.nameInput.substring( nameArr[0].length, this.nameInput.length),
            primaryPhone: this.phone1Input,
            alternativePhone: this.phone2Input,
            address: this.addressInput,
            district: this.districtInput,
            city: this.cityInput,
            DOB: moment(this.dobInput, this.format).format("YYYY-MM-DD"),
            nationalId: this.nationalIdInput,
        }

        this.updateClient(data)
    },

    createHandle() {
        
        this.updateClientHanle()

        const newContractData = {
            orderID: this.orderID,
            clientID: this.clientId,
            productID: this.productListResult[this.packageInput].id,
            expectedAmount: parseFloat(this.expectedAmountInput),
            validatorAmount: parseFloat(this.validatorAmount1Input),
            approvedAmount: parseFloat(this.approvedAmountInput),
            interestRate: parseFloat(this.interestRateInput),
            overdueFee: parseFloat(this.overdueFeeInput),
            warehousingFee: parseFloat(this.warehousingFeeInput) || 0,
            openingDate: moment(this.openingDateInput, this.format).format("YYYY-MM-DD"),
            expirationDate: moment(this.expirationDateInput, this.format).format("YYYY-MM-DD"),
            penalty: parseFloat(this.toFixed(this.owedInput - this.receivedAmountInput, 3)) || 0,
            oldPenalty: this.oldContractCharge,
            parentContractId: this.contractId,
        }

        this.createContract(newContractData).then(() => {
            if (this.contractCreatingErrorCode === 201) {
                this.$notify({
                    group: 'foo',
                    type: 'success',
                    title: "Gia hạn hợp đồng thành công",
                    text: ''
                });
                
                const oldContractData = {
                    contractId: this.contractId,
                    diffAmount: this.diffAmountInput,
                }
                this.updateContract(oldContractData)
            } else {
                this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: "Error: "+this.contractCreatingErrorCode,
                    text: this.contractCreatingError
                });
            }
        })
    },
    endHandle() {
       this.endExtent = true
    },
    cancelCreatedContract() {
        this.cancelContract({id: this.contractCreatingResult.id, oldContractId: this.contractId}).then(() => {
            if (this.contractUpadtingErrorCode === 200) {
                this.$router.back()
            } else {
                this.$notify({
                    group: 'foo',
                    type: 'error',
                    title: "Error: "+this.contractUpadtingErrorCode,
                    text: this.contractUpadtingError
                })
            }
        })
    },
    backHandle() {
      this.$router.back()  
    },
    toFixed (number, n) {
        return parseFloat(number.toFixed(n)).toString();
    }
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
    padding-left: 16px;
}
.title-form {
    text-align: center;
    text-decoration: underline;
    margin-top: 20px;
}
.form-customer {
    background-color: #ffffff;
    border-style: solid;
    border-width: 1px;
}
.padding {
    padding-left: 95px;
    padding-right: 95px;
    background-color: #ffffff;
    border-style: solid;
}
.form {
    background-color: red;
    border-style: solid;
    border-width: 1px;
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
.input-header {
    font-size: 1vw;
    color: black;
}
.header-form {
    max-width: 11%;
    width: 11%;
}
.header-form-left {
   margin-left: 5%;
}
.space {
    max-width: 25%;
}
.required {
  color: #dd1e26;
}

.select-fix-height .vld-icon {
  text-align: center !important;
}
.select-fix-height .v-text-field--box .v-input__slot, 
.select-fix-height .v-text-field--outline .v-input__slot{
  min-height: 45px !important;
  border: 1px solid !important;
}
.select-fix-height .v-select__selections {
  padding-top: 0px !important;
}
.select-fix-height .v-input__append-inner{
  margin-top: 10px !important;
}
.succes-extent {
    border: 1px solid;
    background-color: white;
    height: 50vh;
}
.form {
    background-color: #ffffff;
    border-style: solid;
    justify-content: center;
}
.content-success {
    color: #4D4F5C;
    font-size: 70px;
}
</style>