<template>
  <div class="scan-code-treaty-box">
    <!-- Header -->
    <yzg-header :title="'协议详情'" :isBack="true"/>

    <div class="scan-code-treaty-center">
      <h3>通联支付网络服务股份有限公司收银宝业务协议</h3>

      <p>甲、乙双方基于平等互利、公平自愿、诚实信用原则，经充分协商，达成本合作协议，共同明确双方的权利义务关系。具体内容如下：</p>
      <h4>第一条 名词解释</h4>
      <p>一、收银宝服务：指甲方基于乙方支付平台，通过乙方提供的终端、互联网及移动互联网等产品进行支付交易，乙方向甲方或甲方客户提供的资金收付款的支付服务及账户管理、市场营销等其他增值服务。</p>
      <p>二、云账户管理：乙方为甲方提供的账户管理服务，服务内容包括提供充值、提现、查询余额等功能。</p>
      <p>三、账户管理方：指银行卡账户管理方（银行）及第三方软件平台（包括但不限于微信支付、支付宝、通联钱包、百度钱包、京东钱包、QQ钱包等）的应用管理方。</p>
      <p>四、退单：是指由付款客户发起的要求乙方合作银行撤销已发生的成功交易，或由乙方合作银行主动发起的撤销交易。</p>
      <p>五、调单：是指因付款客户或乙方合作银行对已发生的成功交易存有疑问，在规定的时限内通过乙方向甲方提出调阅交易单据的行为。乙方也可基于风险管理的需要，向甲方调取交易签购单据、网上交易记录和相关消费凭证等。</p>
      <p>六、否认交易：交易成功后，付款客户对交易本身或引发此项交易的任何民商事行为进行否认。</p>
      <p>七、可疑交易：指乙方或乙方合作银行或银行卡组织等按照法律、法规及监管规定的要求认为已发生的成功交易可能违反相关法律法规或监管规定或者资金本身可能来源于违法犯罪活动（包括但不限于套现、洗钱、恐怖融资、盗卡、赌博等行为）。</p>
      <p>八、会员卡：由乙方提供会员卡系统及支持，甲方发行的以自定义号码为卡号、仅限在甲方的受理商户处使用的电子卡。</p>
      <h4>第二条 服务内容</h4>
      <p>一、乙方为甲方提供资金收款和云账户管理的基础服务。</p>
      <p>二、乙方根据甲方需求提供以下增值服务，甲方选择的增值服务见附表。</p>
      <p>（一）提供银行卡及第三方软件平台（包括但不限于微信支付、支付宝、通联钱包、百度钱包、京东钱包、QQ钱包等，以实际开通服务为准）的支付和受理服务。</p>
      <p>（二）乙方向甲方推荐其合作金融机构向甲方提供包括理财、基金、保险、融资等各类金融服务（如甲方开通此项服务，甲乙双方另行签订补充协议。）</p>
      <p>三、乙方为甲方提供支付业务的收款服务，乙方可提供个性化清算服务。乙方受甲方委托，将收款资金清算到甲方账户或用于购买金融增值服务产品。如甲方有融资需求，甲方在乙方系统的交易流水可作为信用记录，向乙方提出贷款申请。</p>
      <p>四、乙方为甲方提供会员卡系统，甲方可通过该系统进行会员卡管理，包括电子卡的发行、充值、消费以及交易流水和报表查询。</p>
      <h4>第三条 甲方的权利与义务</h4>
      <p>一、按照乙方要求填写《收银宝业务注册登记表》（见附表），并向乙方提供加盖甲方公章的甲方工商营业执照复印件、甲方组织机构代码证复印件、甲方税务登记证复印件、甲方法人身份证正反面复印件、甲方所经营业务的许可证及相关资质证明材料，并保证填写的资料信息及提供的公司证件真实、准确、完整、合法、有效。甲方独立承担因资料不准确、不真实而引发的一切责任，入网登记的任何资料如商户名称、营业地址、经营范围、法人代表、结算账户及联系人等发生变更，应提前十五个工作日以书面形式通知甲方办理相应变更手续，若因甲方未及时通知乙方导致乙方不能为甲方提供正常服务的，由甲方自行承担责任。</p>
      <p>二、付款客户使用乙方的支付系统进行交易，甲方按账户管理方的要求和规范，配合乙方提供的操作指引进行系统及终端机具操作。</p>
      <p>付款客户选择被动扫码交易的，甲方通过扫描付款客户出示的付款码，按照账户管理方规则要求，在银行卡密码或手机指纹验证通过后完成收款交易；</p>
      <p>付款客户选择主动扫码交易的，付款客户通过扫描甲方出示的收款码，按照账户管理方规则要求，在银行卡密码或手机指纹验证通过后完成付款交易；</p>
      <p>付款客户选择刷卡交易的，经银行卡密码验证通过并且交易成功后，由付款客户签名（包括书面签名或电子签名）确认授权甲方从交易账户卡内扣款。甲方保证付款客户所签署的签购单的真实、准确、合法、完整和有效性。</p>
      <p>交易完成后的两年内，甲方有义务保留相关交易信息和签收凭证，供乙方、银行及账户管理方调阅或查询，如因甲方对交易信息或单据保管不当或遗失而造成的经济损失由甲方承担。</p>
      <p>三、甲方与付款客户的交易纠纷由甲方处理，与乙方无关。</p>
      <p>四、甲方不得利用乙方提供的支付系统从事洗钱、赌博、金融诈骗、恐怖融资等各种违法犯罪活动，若乙方一旦发现甲方产品所涉及的产品销售或服务提供与国家或任何地方的任何机关的法律、法规、规章或规定有所抵触时，乙方有权立即终止本协议、停止服务并向有关监管机关或司法机关报告，并由甲方承担因违禁行为所导致的一切经济及法律责任。</p>
      <p>五、甲方因电话故障或经营场所变更等原因须变更POS接入电话的或改变装机地点的，应提前向乙方主动报告，由乙方协助甲方变更装机地址；在未经乙方许可的情况下，甲方不得以不同门店受理银行卡需要、用固定POS上门收款等为理由擅自移机，确有正常经营需要的应向乙方提出申请，由乙方书面审批同意。</p>
      <p>六、甲方不得将交易凭据、支付系统终端用于本协议许可范围以外的其它用途，也不得出租、出借给本协议许可范围以外的第三方使用。</p>
      <p>七、甲方应严格遵守甲方和乙方规定的账户及交易数据安全管理规则要求：</p>
      <p>（一）账户信息、二维码信息和交易数据仅用于辅助完成支付交易，甲方不得将账户信息、二维码信息和交易数据用于除此之外的任何其它用途；未经乙方同意，不得将账户信息及交易数据信息披露给第三方；</p>
      <p>（二）不得以任何方式存储二维码信息或银行卡磁道信息、卡片验证码、个人密码及卡片有效期；</p>
      <p>（三）应将交易凭据等存有账号信息的介质保存在安全领域，并只允许经授权人员接触，严禁泄露给第三方。</p>
      <p>甲方违反上述规定，导致账户信息、二维码信息及交易数据被篡改、泄露和破坏而造成的相关经济损失以及其它损失均由甲方承担。</p>
      <p>八、甲方应妥善使用和保管甲方提供的全部的支付系统终端、空白签购单和Ukey，并保证设备或Ukey除由乙方或乙方授权的相关人员进行维护和更换外，不被其它人员进行任何检测、拆修、改装、更换、移动或加装其它设备。</p>
      <p>九、未经乙方书面许可，甲方不得擅自使用乙方企业名称、商标、LOGO、中英文标识等。甲方不得在其所在地或他国注册与乙方相关的商标或注册与乙方相似、相近的商标等。</p>
      <p>十、甲方应对终端使用人员及操作权限进行妥善管理及严格监管，包括甲方员工、委托或外包的使用人员。若因甲方人为操作失误、甲方系统原因造成的相关损失和风险责任由甲方承担。</p>
      <p>十一、甲方负责会员卡销售、资金的管理，并承担所提供商品或服务的质量责任。</p>
      <h4>第四条 乙方的权利与义务</h4>
      <p>一、乙方为甲方提供第二条所述服务，并有权向甲方收取服务费和交易手续费等费用（费用收取方式及金额相见第五条及附表）。</p>
      <p>二、资金清算以乙方成功清算的数据为准，乙方定期将甲方支付成功的交易以电子文件的形式发送甲方用于对账。</p>
      <p>三、如发生退单，乙方有权根据交易数据直接从甲方的往来款项和结算账户中扣款，但乙方必须通知甲方，并在甲方及时按规定提供有效单据后，按照差错处理业务的相关规定向发卡行或账户管理方索款。</p>
      <p>四、乙方基于监管及付款客户账户管理方要求或自身风险管理要求，对经交易差错及甲方需调整的账务，乙方有权向甲方调单。甲方应在接到调单通知后的规定时间内提供有效的交易签购单据，否则乙方有权暂停甲方交易，并冻结甲方待清算资金。</p>
      <p>五、在交易成功后出现付款客户否认交易以及其它无法确定责任人事故造成的争议时，乙方有权冻结甲方待结算资金并通知甲方，由甲方协调解决（冻结期不超过一百八十天）；乙方可在冻结期限内根据有权机关或中国人民银行等监管机构处理结果对已冻结的待结算资金进行相应处理。若因乙方合作银行或银行卡组织要求乙方先行赔付或其他情况导致乙方为甲方垫付款项的，乙方有权按照垫付金额每日1%的标准向甲方收取违约金，如甲方逾期超过十日仍未付清乙方所垫款项的，乙方有权终止本协议并追究甲方的违约及损失赔偿责任。若冻结期限内乙方未收到有权机关或中国人民银行等监管机构明确处理要求的，冻结期满后乙方将已冻结的待结算资金无息退回甲方账户。</p>
      <p>六、若甲方发生可疑交易（包括但不限于套现、洗钱、客户资金被盗等情形），甲方有义务协助乙方调查可疑交易，并按照乙方、发卡银行或账户管理方的要求，提供可疑交易的相关明细信息及交易单据。若甲方无法在规定时限内按照要求提供相应资料以证明交易的合法性。乙方有权冻结甲方结算资金留待审查，造成的损失全部由甲方承担。</p>
      <p>七、在甲方使用乙方支付服务的过程中，如出现差错，甲、乙双方应密切配合查明原因，互相协助解决差错问题。甲方对乙方的协助方式包括但不限于甲方积极向乙方提供申请资料、交易信息等，配合乙方和付款客户的沟通、交涉、追款及索赔等工作。</p>
      <p>八、甲方出现下列违规操作行为时，乙方有权要求甲方予以整改。如甲方在本协议约定的整改期限仍未停止违规操作行为的，乙方有权单方面无条件终止本协议，由此带给乙方的相关损失和风险责任由甲方承担。</p>
      <p>（一）未按照乙方提供的收银宝业务管理规范和终端操作手册进行业务处理和操作；</p>
      <p>（二）涂改签购单、分单操作；</p>
      <p>（三）不仔细核对签名及信用卡有效期；</p>
      <p>（四）其它违规操作的行为。</p>
      <p>九、甲方出现下列违规操作行为时，乙方有权立即单方面无条件终止本协议，收回全部终端设备并通知甲方，由此带给甲方和乙方的相关损失和风险责任由甲方承担：</p>
      <p>（一）甲方已被卡组织认定为“高风险商户”或被列入黑名单；</p>
      <p>（二）监管机构、中国银联、账户管理方已书面通知乙方对甲方强制解约；</p>
      <p>（三）甲方因银行卡欺诈交易已被司法机关立案或介入调查；</p>
      <p>（四）甲方以虚假资料或盗用其他商户资料向收单机构申请为特约商户；</p>
      <p>（五）甲方接受银行卡支付的预付款后故意破产，使收单机构承担退单损失或经营不善，已破产或停业；</p>
      <p>（六）甲方和/或甲方员工与不法分子共谋或发现后不制止不法分子在乙方提供的支付工具（包括电子设备或支付控件或程序）装载侧录仪器、木马等，盗录付款客户信息，出卖给伪卡制作集团或自行制作伪卡，进行终端刷卡、取现、互联网支付、移动互联网支付的欺诈交易行为；</p>
      <p>（七）甲方将付款客户账户信息或交易数据泄漏给不法分子使用；</p>
      <p>（八）甲方在付款客户不知情的情况下，利用其账户编造虚假交易或在付款客户消费的同时多压印单据或重复刷卡或多次扫码，并冒用付款客户签名（包括书面签名或电子签名）进行虚假交易；</p>
      <p>（九）甲方擅自移机或将甲方终端设备及技术用于其他用途；</p>
      <p>（十）甲方和/或甲方员工与不良付款人或其他第三方勾结，或甲方自身以虚拟交易套取现金；</p>
      <p>（十一）未按照甲方提供的收银宝业务手册和终端操作手册规范客户交易；</p>
      <p>（十二）其他重大违规行为或风险。</p>
      <p>十、乙方提供会员卡服务为以下内容：</p>
      <p>（一）乙方向甲方提供会员卡系统的操作说明或手册，并负责进行操作、维护培训。</p>
      <p>（二）乙方应保障会员卡管理后台系统的正常运转，以及甲方会员卡数据的安全性、准确性。</p>
      <p>（三）乙方负责定期提供会员卡清算交易报表，并以此为会员卡业务参与各方结算依据。</p>
      <h4>第五条 资金结算</h4>
      <p>一、乙方在扣款操作成功后，按照附表约定的结算周期和结算方式，将交易资金自动结算到甲方指定的银行账户或由甲方自主发起清算。如甲方选择自主发起清算，则甲方可通过乙方支付平台自行对账，并自主发起资金提取指令，乙方根据甲方指令将资金清算到甲方绑定的银行账户。</p>
      <p>二、对涉及可疑、非法、高风险或产生纠纷的交易，交易资金应银行、公安、检察院、法院等机关要求或乙方内部风险管理要求不能按照约定周期进行结算时，双方再行就涉及上述情况的资金结算事宜进行商定。</p>
      <h4>第六条 服务费用</h4>
      <p>一、终端机具的服务费：</p>
      <p>□一次性付清：由甲方向乙方申请终端时一次性支付终端服务费，乙方在收到费用后应向甲方开具发票。甲方因违反本协议的约定而导致乙方关闭服务的，对已支付的终端费用不予退还。</p>
      <p>□每月支付：甲方向乙方申请使用乙方提供的终端，甲方应按月支付乙方终端使用费。</p>
      <p>（一）甲方选择每月支付终端服务费的，甲方还应向乙方支付终端押金（押金收取标准见附表）。当合作终止，甲方将终端完好归还乙方后，乙方将押金无息退还给甲方。</p>
      <p>（二）甲方人员在日常操作时须按乙方的要求操作。如果由于甲方原因造成终端损坏，甲方应支付相应的修理费和成本；如果终端遗失或被窃或由于甲方过错造成损坏的终端不能被修复的，或本协议终止时甲方拒绝按约定返还乙方终端的，甲方应向乙方支付赔偿金，赔偿金额按下列公式计算：赔偿金额 = 终端价格×（1-已使用月数/60）</p>
      <p>乙方可在押金中扣除前述维修、赔偿等相应款项，若甲方因上述行为给乙方造成的损失超出押金部分，乙方有权向甲方追索。</p>
      <p>二、交易手续费：</p>
      <p>甲方可以选择由乙方在资金结算时直接扣除交易手续费，也可以选择预付费的方式购买优惠套餐，手续费则从预付费的套餐中扣除。选择购买预付费优惠套餐的，如遇本协议到期自然终止或甲方违约导致协议终止，未使用完的部分不予结转、不予清退。手续费收取标准详见附表。</p>
      <p>三、提现手续费：</p>
      <p>如甲方需要交易资金于当天到账，则发起”快速提现”指令并需支付手续费；如甲方需要交易资金于下一个工作日到账，则发起”标准提现”指令,标准提现首两笔免费，第三笔起开始收费。手续费收取标准详见附表。</p>
      <h4>第七条 违约责任</h4>
      <p>一、 本协议一经签署，甲、乙双方应严格遵守。本协议任何一方在协议履行过程中违反任何约定的应承担违约责任。违约方除应赔偿守约方的直接经济损失外，守约方还可保留进一步追究的权利。</p>
      <p>二、若甲方从事国家明令禁止的经营活动，乙方有权采取包括暂停交易资金结算、暂停支付交易、终止协议在内的相关措施，并由甲方承担由此引发的所有责任。</p>
      <p>三、如甲方未按期向乙方支付各项费用，需按照迟延拖欠款项每日1%的标准向乙方支付违约金，经乙方通知催收10日后，甲方无正当理由仍未支付的，乙方有权解除本协议，并不再返还甲方已经支付的费用。</p>
      <h4>第八条 不可抗力</h4>
      <p>由于发生地震、台风、水灾、火灾等不可抗力事件，致使本协议无法履行或不能按约定履行，遭遇不可抗力的一方应于不可抗力发生之日起三个工作日内以书面形式通知另一协议其他方，并及时出具有关部门的证明文件。因不可抗力造成的损失，双方互不承担责任，双方应在合理时限内协商是否继续履行本协议。</p>
      <h4>第九条 保密责任</h4>
      <p>一、甲、乙双方应对其在本协议签订及履行过程中所获知的对方各项信息、技术、商业秘密承担严格的保密义务。本协议保密义务为持续性义务，不因本协议的终止而终止。</p>
      <p>三、乙方有义务配合国家司法机关及其他有权机关的调查、取证工作，应司法机关或其他有权机关要求提供协议及相关交易数据，且乙方不因此承担泄密的责任。</p>
      <h4>第十条 生效及期限</h4>
      <p>本协议自甲、乙双方盖章之日起生效，有效期为   年。如果在该有效期到期或在任何延长期到期前十五天内，任何一方均未提出终止本协议，本协议将自动延期一年。</p>
      <h4>第十一条 争议解决</h4>
      <p>本协议适用中华人民共和国法律。因本协议而产生的或与本协议有关的一切争议，双方应友好协商解决，协商不成，应向乙方所在地人民法院提起诉讼。争议解决期间，除争议事项外，双方应继续遵守本协议项下的其他条款，履行本协议项下的其他义务。</p>
      <p>第十二条 其他</p>
      <p>一、协议附件为本协议的组成部分。</p>
      <p>二、本协议一式贰份，双方各执壹份，具有同等法律效力。</p>
    </div>

    <!-- 兼容iPhone X -->
    <div class="seize"></div>
  </div>
</template>
<script>
import YzgHeader from "../../../../components/header/header.vue";

export default {
  name: "scancodetreaty",
  components: {
    YzgHeader
  }
};
</script>

<style lang="scss">
.scan-code-treaty-box {
  .scan-code-treaty-center {
    color: #333;
    padding: 50px 10px 60px;
    h3 {
      padding: 20px;
      text-align: center;
    }
    h4 {
      padding: 2px 0px;
    }
    p {
      line-height: 20px;
      font-size: 14px;
      padding: 2px 0px;
    }
  }
}

@media screen and (device-width: 375px) and (device-height: 812px) {
  div.scan-code-treaty-box div.seize {
    // position: fixed;
    width: 100%;
    height: 34px;
    background-color: #fff;
  }
}
</style>