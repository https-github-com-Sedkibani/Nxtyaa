import * as React from "react";


//@ts-ignore
import logoBrand from "../../../assets/img/logo.png";

import { Footer } from "../../components/footer/Footer";
import "./PrivacyAndPolicy.scss";

const PrivacyPage = () => {
  return (
    <div className="privacy-policy">
      {/* <img src={logoBrand} className="logo-brand" /> */}
      <div className="privacy-and-policy">
        <h1 className="rtl text-center">مسابقة : جيلايس كل جيل وٱيسو</h1>
        <p className="rtl">
          هذه المسابقة معدة من قبل شركة النسيم للصناعات الغذائية الناشطة في قطاع
          الألبان والأجبان والمثلجات والعصائر والكائنة بطريق النقل الثقيل
          مصراته. سجل تجاري رقم 1825.
        </p>
        <h5 className="rtl">مبدأ المسابقة :</h5>
        <p className="rtl">
          مسابقة آيس كريم جيلايس النّسيم كل جيل وآيسو تشمل جميع المناطق اللّيبية
          و تعتمد على السحب العشوائي .
        </p>

        <p className="rtl">السحب العشوائي :</p>
        <ul className="rtl">
          <li> سيتم سحب 26 فائزا عبر منظومة ٱلمسابقة</li>
        </ul>

        <p className="rtl">الجوائز:</p>
        <ul className="rtl">
          <li> 3 جهاز بلايستيشن Ps5</li>
          <li>3 هواتف جوالة Samsung S21 </li>
          <li>10 ساعات يدوية Samsung Watch Active 2 </li>
          <li>10 ألواح تزلج Hoverboard </li>
        </ul>

        <p className="rtl">
          شارك و اربح ! جوائز قيمة في انتظاركم تتماشى مع جيلك وجيل غيرك
        </p>
        <p className="rtl">
          - صوّر جيلاطي ٱلنّسيم جيلايس المفضل لديك ، ثم تعرف على جيلايس الذي
          يناسب شخصيتك بالإجابة على 4 أسئلة QUIZ
        </p>
        <p className="rtl">واضمن تسجيلك في السحب العشوائي.</p>

        <p className="rtl">- مراحل المشاركة:</p>
        <ul className="rtl">
          <li>
            -يقوم المشارك بالدخول على موقع المسابقة
            <span
              style={{
                direction: "ltr",
              }}
            >
              <br />
              https://gilicegenerations.com/
            </span>
          </li>
          <li>-يضغط على زرّ شارك و اربح ويقوم بربط حسابه بالفايسبوك</li>
          <li>
            يقوم المشارك بتعمير نموذج المشاركة، الإسم واللّقب ، البريد
            الإلكتروني ، رقم ٱلهاتف وٱلمدينة{" "}
          </li>
          <li>
            يصوّر المشارك آيس كريم جيلايس النسيم ويقوم بتحميل الصورة على موقع
            المسابقة مع اختيار نوع جيل آيس ٱلموجود في ٱلصورة .
          </li>
          <li>
            يقوم المشارك بالإجابة على 4 أسئلة ترفهية QUIZ لاكتشاف الأيس كريم
            جيلايس ٱلذي يتماشى مع جيله بطريقة طريفة.
          </li>
          <li>يتم التثّبت من ٱلصّورة ٱلمحّملة .</li>
          <li>
            بعد اعتماد الصورة و بعد الإجابة عن الأسئلة يضمن المشارك تسجيله في
            السحب العشوائي
          </li>
        </ul>

        <p className="rtl">- شروط ٱلمشاركة :</p>
        <ul className="rtl">
          <li>
            يجب أن تكون جميع ٱلبيانات ٱلمدرجة صحيحة ومطابقة لشروط ٱلمسابقة .
          </li>
          <li>يجب أن يكون ٱلمشارك مواطنا ليبيا . </li>
          <li>سيتم حذف أي مشاركة غير مطابقة لشروط المسابقة .</li>
          <li>يمنع استعمال صورة آيس كريم لمشارك آخر أو صورة مفبركة.</li>
          <li>يمنع فوز شخصين من نفس ٱلعائلة.</li>
        </ul>

        <p className="rtl">تواريخ ٱلمسابقة :</p>
        <ul className="rtl">
          <li>
            تنطلق المسابقة يوم الاثنين 21 يونيو 2021 وتدوم مبدئيا 15 أيام .
          </li>
          <li>يتم الإعلان عن أسماء ٱلفائزين خلال 3 أيّام من انتهاء ٱلمسابقة</li>
        </ul>

        <h1
          style={{
            marginTop: 60,
          }}
          className="text-center"
        >
          Gilice Ice Cream Competition
        </h1>

        <p>
          Competition Principle: Gilice competition is a randomly pick contest
          winners style competition all across Libya.
        </p>

        <p>
          Brand: <br /> Al Naseem for Food Industries Lybia HYPERLINK
          "https://www.alnaseemdairy.com/" https://www.alnaseemdairy.com/
        </p>
        <p>
          Winners selection:
          <br />
          26 winners to be randomly picked by the competition’s generator.
        </p>

        <p>Prizes</p>
        <ul>
          <li>(3) PS5 </li>
          <li>(3) Samsung S21</li>
          <li>(10) Samsung Watch Active</li>
          <li>(10) Hoverboard</li>
        </ul>

        <p>
          Join this amazing competition and be a winner, a lot of awesome prizes
          suite different generations are waiting for you, let the generations
          meet.
        </p>

        <p>Registration Steps:</p>
        <ul>
          <li>First, go to http://gilicegenerations.com/</li>
          <li>
            Click (Join & Win), to be safely linked to your Facebook account
          </li>
          <li>Fill the required information to register.</li>
          <li>
            Select your Gilice from the list, and take a photo of your Gilice
          </li>
          <li>Upload your photo.</li>
          <li>Answer the quiz to confirm your registration.</li>
          <li>You finished? Well Done.</li>
          <li>Wait for your photo to be uploaded.</li>
        </ul>

        <p>Conditions:</p>
        <ul>
          <li>Information of competitors should be real and accurate.</li>
          <li>Libyan citizens only.</li>
          <li>Registrations with flaws to be cancelled.</li>
          <li>
            It is prohibited to use other competitors’ photos, and neither fake
            photos.
          </li>
          <li>
            It is prohibited to have more than a single winner from the same
            family.
          </li>
        </ul>

        <p>
          Dates: <br /> Monday, June 21st(Competition starts), competition to be
          continued along 15 days.
        </p>
        <p>3 days after the end of the competition (Winners Announcement).</p>

        <h3>Privacy:</h3>
        <p>
          Privacy: This policy is made to elaborate the main purpose of
          collecting visitors’ personal information while visiting our safe
          website.
        </p>

        <h3>Browsing:</h3>
        <p>
          This website was not designed for the sake of collecting the private
          information on your device, however, the information collected to
          fulfil the competition conditions with your complete knowledge and
          agreeing.
        </p>

        <h3>(IP) address:</h3>
        <p>
          Visiting our websites, including this one in specific, can lead to
          register your (IP) address by our Hosting Server, including your
          internet browser’s name and information, also, determining time and
          date of the visit. This procedure takes place after being directed to
          any of our URL pages on the web.
        </p>

        <h3>Information Confidentiality</h3>
        <p>
          Protection and safety of the collected information is our priority.
          Hence, the information to be privately saved, without being shared
          with any third party, unless if the information were required by a
          governmental or legalization authority for legal purposes.
        </p>

        <h3>Required information</h3>
        <p>
          The needed information to be given according to your full knowledge
          and agreeing, as such information will be merely used to confirm your
          registration for the competition, and contacting you in advance.
        </p>
        <p>
          Additionally, the information are strictly not going to be sold for
          the benefit of any third party unless you agreed on using those
          primary group data in statistical studies and researches without
          giving any indicators declaring your identity.
        </p>

        <h3>In case you contacted us:</h3>
        <p>
          Your information will be as a profile for you at Al Naseem to be
          recognized while calling for inquiries, comments, or requests on this
          page and the rest of our websites and pages.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPage;
