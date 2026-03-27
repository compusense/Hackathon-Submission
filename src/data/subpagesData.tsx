import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { 
  Target, 
  Eye, 
  Award, 
  Zap, 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  Globe, 
  UserCheck, 
  Cpu, 
  Briefcase,
  Smartphone,
  Signal,
  Wifi,
  FileText,
  ArrowRight,
  Monitor,
  Radio,
  Tv,
  HelpCircle,
  CheckCircle2,
  MessageSquare,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import ConsumerComplaintForm from '../components/ConsumerComplaintForm';
import RegulatoryHistoryTimeline from '../components/RegulatoryHistoryTimeline';
import InternetDocuments from '../components/InternetDocuments';
import PostalDocuments from '../components/PostalDocuments';

export interface SubPageData {
  title: string;
  colorScheme?: 'green' | 'red' | 'yellow' | 'blue' | 'maroon' | 'grey' | 'violet';
  breadcrumbs: { label: string; path: string }[];
  content: ReactNode;
  sidebarLinks?: { label: string; path: string }[];
  downloads?: { title: string; size: string; type: string; url: string }[];
  sidebarContent?: ReactNode;
}

const aboutSidebar = [
  { label: 'Who We Are', path: '/about/who-we-are' },
  { label: 'Regulatory History', path: '/about/history' },
  { label: 'Board of Directors', path: '/about/board' },
  { label: 'Executive Management', path: '/about/management' },
  { label: 'Strategic Plan', path: '/about/strategic-plan' },
];

const regulatorySidebar = [
  { label: 'Telecommunications', path: '/regulatory/telecom' },
  { label: 'Broadcasting', path: '/regulatory/broadcasting' },
  { label: 'Postal Services', path: '/regulatory/postal' },
  { label: 'Spectrum Management', path: '/regulatory/spectrum' },
  { label: 'Type Approval', path: '/regulatory/type-approval' },
];

const consumerSidebar = [
  { label: 'Consumer Rights & Education', path: '/consumer/rights-and-education' },
  { label: 'Log a Complaint', path: '/redirect?to=https://studio--loanmanagement-2381a.us-central1.hosted.app/consumer/complaints' },
];

export const subpagesData: Record<string, SubPageData> = {
  '/about/who-we-are': {
    title: 'Who We Are',
    breadcrumbs: [{ label: 'About Us', path: '/about' }, { label: 'Who We Are', path: '/about/who-we-are' }],
    sidebarLinks: aboutSidebar,
    downloads: [
      { title: 'CRA Act 2012', size: '2.4 MB', type: 'PDF', url: '#' },
      { title: 'BOCRA Corporate Profile', size: '1.1 MB', type: 'PDF', url: '#' },
    ],
    content: (
      <div className="flex flex-col gap-12 text-gray-600 dark:text-gray-300 leading-relaxed">
        {/* Profile Section */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-bocra-blue dark:text-blue-400 border-b-2 border-bocra-blue pb-2 inline-block">Our Profile</h2>
          <p className="text-lg leading-relaxed">
            The Botswana Communications Regulatory Authority (BOCRA) was established through the Communications Regulatory Authority Act, 2012 (CRA Act) on the 1st of April 2013 to regulate the communications sector in Botswana, comprising telecommunications, Internet and Information and Communications Technologies (ICTs), radio communications, broadcasting, postal services and related matters.
          </p>
          <p>
            The CRA Act replaced the Broadcasting Act [Cap 72:04], the Telecommunications Act [Cap 72:03], and caused the amendment of the Postal Services Act to create a converged or an integrated regulatory authority for the communications industry.
          </p>
        </section>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-bocra-blue text-white p-8 rounded-3xl shadow-lg relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <Target size={120} />
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 p-3 rounded-2xl">
                <Target className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold">Our Mission</h3>
            </div>
            <p className="text-lg leading-relaxed relative z-10">
              To regulate the Communications sector for the promotion of competition, innovation, consumer protection and universal access.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 border-2 border-bocra-blue p-8 rounded-3xl shadow-lg relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <Eye size={120} />
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-bocra-blue/10 p-3 rounded-2xl">
                <Eye className="text-bocra-blue" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-bocra-blue dark:text-blue-400">Our Vision</h3>
            </div>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200 relative z-10">
              A connected and Digitally Driven Society.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-bocra-blue dark:text-blue-400">Our Core Values</h2>
            <p className="text-gray-500 mt-2">The principles that guide our every action</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: 'Excellence',
                icon: <Award className="text-bocra-blue" />,
                desc: 'We will strive to be the world-class leader in the provision of regulatory services through committed teams and impeccable customer service.'
              },
              {
                title: 'Proactiveness',
                icon: <Zap className="text-bocra-blue" />,
                desc: 'We will be forward looking in the delivery of our mandate, to keep up with evolving industry trends.'
              },
              {
                title: 'Integrity',
                icon: <ShieldCheck className="text-bocra-blue" />,
                desc: 'In the execution of our mandate we will demonstrate openness, honesty and accountability in all our decisions.'
              },
              {
                title: 'People',
                icon: <Users className="text-bocra-blue" />,
                desc: 'We believe that our people are key to driving our success through their commitment and excellence. We shall therefore harness and develop individual skills and strengths to work as one.'
              }
            ].map((value, i) => (
              <div key={i} className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-bocra-blue transition-colors group">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                    {value.icon}
                  </div>
                  <h4 className="text-xl font-bold text-bocra-blue dark:text-blue-400">{value.title}</h4>
                </div>
                <p className="text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Core Business Section */}
        <section className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 space-y-6">
          <div className="flex items-center gap-4">
            <div className="bg-bocra-blue p-3 rounded-2xl">
              <Briefcase className="text-white" size={28} />
            </div>
            <h2 className="text-3xl font-bold text-bocra-blue dark:text-blue-400">Core Business</h2>
          </div>
          <p className="text-lg">
            BOCRA takes the lead in areas that drive the advancement of the communications sector with the ultimate goal to drive the development of and enable universal access to enhanced services, economic opportunities, employment creation and sustainable growth necessary for the achievement of a Digitally Connected Society.
          </p>
          
          <div className="mt-8">
            <h3 className="text-xl font-bold text-bocra-blue dark:text-blue-400 mb-6 flex items-center gap-2">
              <div className="w-2 h-8 bg-bocra-blue rounded-full"></div>
              Our Strategic Pillars
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Competition', icon: <TrendingUp size={20} /> },
                { title: 'Universal Access and Service', icon: <Globe size={20} /> },
                { title: 'Consumer Protection', icon: <ShieldCheck size={20} /> },
                { title: 'Resource Optimisation', icon: <Cpu size={20} /> },
                { title: 'Talent Management', icon: <UserCheck size={20} /> },
                { title: 'Stakeholder Engagement', icon: <Users size={20} /> }
              ].map((pillar, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                  <div className="text-bocra-blue">
                    {pillar.icon}
                  </div>
                  <span className="font-semibold text-gray-700 dark:text-gray-200">{pillar.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  },
  '/about/history': {
    title: 'History of Communication Regulation',
    breadcrumbs: [{ label: 'About Us', path: '/about' }, { label: 'Regulatory History', path: '/about/history' }],
    sidebarLinks: aboutSidebar,
    content: <RegulatoryHistoryTimeline />
  },
  '/about/board': {
    title: 'Board of Directors',
    breadcrumbs: [{ label: 'About Us', path: '/about' }, { label: 'Board of Directors', path: '/about/board' }],
    sidebarLinks: aboutSidebar,
    content: (
      <div className="flex flex-col gap-12 items-center">
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg text-center max-w-3xl">
          The Board of Directors is the governing body of BOCRA, responsible for the strategic direction and overall oversight of the Authority.
        </p>

        <div className="w-full flex flex-col items-center gap-8">
          {/* Chairperson - Top Level */}
          <div className="w-full max-w-[320px] relative">
            {[
              {
                name: 'Dr. Bokamoso Basutli, PhD',
                position: 'Chairperson',
                image: 'https://www.bocra.org.bw/sites/default/files/people/Dr.%20Bokamoso%20Basutli%20%20-%20Chairperson.jpg',
                bio: 'Dr. Bokamoso Basutli is a Professional Engineer and Senior Member of the Institute of Electrical and Electronics Engineers (IEEE). He is currently the Head of the Department of Electrical and Communications Systems Engineering at the Botswana International University of Science and Technology (BIUST), where he leads the delivery and coordination of Satellite Communications, Digital Signal Processing, and Artificial Intelligence (AI) modules. He is IEEE CertiAIEd Assessor, focusing on the ethical implications of Autonomous Intelligent Systems (AIS). Dr. Basutli serves as the leader of the Signal Processing, Networks, and Systems Research (SPNS) Group. He was the Principal Investigator (PI) and originator of the BotswanaSat-1 project, Botswana’s pioneering satellite initiative. Before joining academia, Dr. Basutli served as an Installation Engineer and later Lead Engineer with Singapore Technologies Electronics (Info-Software Systems). He then worked as a Senior Telecommunications Engineer with the Civil Aviation Authority of Botswana (CAAB). Dr. Basutli has served as the Chairperson, and Vice-Chairperson of the IEEE Botswana Sub-section. He earned his Ph.D. in Electronics, Electrical, and Systems Engineering from Loughborough University, United Kingdom.'
              }
            ].map((member, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 group relative shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-all duration-700 contrast-[1.10] saturate-[1.10] brightness-[1.05] [image-rendering:auto]" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute inset-0 bg-bocra-blue/90 backdrop-blur-sm translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex flex-col p-8 z-10">
                    <div className="mb-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                      <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                      <p className="text-white font-semibold text-sm uppercase tracking-wider">{member.position}</p>
                      <div className="w-12 h-1 bg-white mt-4 rounded-full"></div>
                    </div>
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                      <p className="text-white/90 text-sm leading-relaxed">{member.bio}</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="text-white font-medium text-sm">{member.position}</p>
                  </div>
                </div>
              </div>
            ))}
            {/* Visual Connector Line */}
            <div className="hidden lg:block absolute -bottom-12 left-1/2 -translate-x-1/2 w-px h-12 bg-gray-200 dark:bg-gray-800">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-bocra-blue"></div>
            </div>
          </div>

          {/* Other Board Members - Grid Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full pt-4">
            {[
              {
                name: 'Mr. Moabi Pusumane',
                position: 'Vice Chairperson',
                image: 'https://www.bocra.org.bw/sites/default/files/people/Mr.%20Moabi%20Pusumane%20%20-%20Vice%20Chairperson.jpg',
                bio: 'Moabi Pusumane is a dynamic and results-driven executive with over 15 years of cross-functional experience in telecommunications, project management, market intelligence, route to market, and commercial leadership. Currently serving as Commercial Director at Coca-Cola Beverages Botswana, he specialises in crafting and executing long-term commercial strategies rooted in deep market insights and consumer behavior analysis. His leadership has delivered a 5-year CAGR double digit revenue growth, alongside award-winning marketing campaigns and operational excellence initiatives.'
              },
              {
                name: 'Ms. Montle Phuthego',
                position: 'Board Member',
                image: 'https://www.bocra.org.bw/sites/default/files/people/Ms.%20Montle%20Phuthego%20-%20Member.jpg',
                bio: 'Montle Phuthego is a seasoned business development, trade and investment expert who holds a Master of Science Degree in Economics from the University of Warwick in the United Kingdom. She has substantial experience in economic research, business development, trade and investment, coupled with a strong expertise and experience gained from several executive positions spanning over 20 years, including being the founding Caretaker Chief Executive Officer at SPEDU, Deputy Managing Director at Botswana Development Corporation and other senior executive positions at Botswana Investment and Trade Centre and the Citizen Entrepreneurial Development Agency. She has previously served on a number of Boards - SPEDU, Letlole la Rona and Sechaba Brewery Holdings, in the process leading some Board sub-committees. Montle is currently the Country Director for TechnoServe, an international non-profit organisation delivering business solutions that build and strengthen businesses across various sectors. She strongly believes in the power of entrepreneurship and innovation to accelerate inclusive development.'
              },
              {
                name: 'Ms. Alta Dimpho Seleka',
                position: 'Board Member',
                image: 'https://www.bocra.org.bw/sites/default/files/people/Ms.%20Alta%20Dimpho%20Seleka%20-%20Member.jpg',
                bio: 'Alta Dimpho Seleka is a distinguished finance professional with over two decades of senior leadership in public financial management and fiscal governance. She is a Fellow of both the Association of Chartered Certified Accountants (FCCA-UK) and the Botswana Institute of Chartered Accountants (FCPA-BICA). As Acting Commissioner for Finance and Administration at the Botswana Unified Revenue Service (BURS), Alta manages multibillion-pula tax revenues and corporate expenditure. Her impact is visible in some of Botswana’s most ambitious financial reforms: automating the national payments system, integrating electronic tax collection platforms, and overseeing infrastructure upgrades at strategic border posts.'
              },
              {
                name: 'Ms. Lebogang George',
                position: 'Board Member',
                image: 'https://www.bocra.org.bw/sites/default/files/people/Ms%20Lebogang%20George%20-%20Member.jpg',
                bio: 'Lebogang George is a Partner at AJA/MCL, and an attorney admitted to the High Courts of Botswana. She has extensive experience in commercial law, procurement law, ICT law, IT governance, and data protection & privacy law in Botswana, South Africa, and the EU. She specialises in drafting and negotiating complex software agreements and advising clients on compliance and governance matters. Lebogang has a strong track record of developing data strategies and providing data protection and corporate governance training. She is a recipient of the Law & Logic Certificate from Harvard Law School and the European University Institute.'
              },
              {
                name: 'Mr. Ronald Kgafela',
                position: 'Board Member',
                image: 'https://www.bocra.org.bw/sites/default/files/people/Mr.%20Ronald%20Kgafela%20-%20Member.jpg',
                bio: 'Ronald Kgafela is a seasoned Human Capital leader with over 20 years of experience spanning Human Resources, Organisational Development, Employment Relations, Change, and Transformation. He is a Certified Professional Business Coach (PBC) and a Chartered Organisational Development Practitioner (CODP™️). Ronald’s career spans multiple industries, including utilities, manufacturing, mining, construction, retail, consulting, and banking. He currently serves as Head of HR at NBFIRA and is a registered professional with the South African Board for People Practices (SABPP).'
              },
              {
                name: 'Dr. Kennedy Ramojela',
                position: 'Board Member',
                image: 'https://www.bocra.org.bw/sites/default/files/people/Dr.%20Kennedy%20Ramojela%20-%20Member.jpg',
                bio: 'Dr Kennedy Ramojela holds a PhD in Media and Communications from RMIT University, Australia. He is a Media and Communications practitioner and a senior executive with a keen focus on management, operations and strategy. Currently serving as a Media and Communications lecturer at the University of Botswana, Dr Ramojela oversees and lectures in all digital media courses in the Department of Media Studies. He has over two decades of experience across media, creatives and technology organisations, and has implemented agile methodologies that aligned media studies programmes with industry needs.'
              }
            ].map((member, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 group relative shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-all duration-700 contrast-[1.10] saturate-[1.10] brightness-[1.05] [image-rendering:auto]" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute inset-0 bg-bocra-blue/90 backdrop-blur-sm translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex flex-col p-8 z-10">
                    <div className="mb-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                      <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                      <p className="text-white font-semibold text-sm uppercase tracking-wider">{member.position}</p>
                      <div className="w-12 h-1 bg-white mt-4 rounded-full"></div>
                    </div>
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                      <p className="text-white/90 text-sm leading-relaxed">{member.bio}</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="text-white font-medium text-sm">{member.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  '/about/management': {
    title: 'Executive Management',
    breadcrumbs: [{ label: 'About Us', path: '/about' }, { label: 'Executive Management', path: '/about/management' }],
    sidebarLinks: aboutSidebar,
    content: (
      <div className="flex flex-col gap-12 items-center relative">
        {/* Background Design Elements */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-5 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-bocra-blue rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg text-center max-w-3xl">
          The Executive Management team is responsible for the day-to-day operations of BOCRA, ensuring the effective implementation of the Authority's strategic objectives.
        </p>

        <div className="w-full flex flex-col items-center gap-12">
          {/* Chief Executive - Top Level (1) */}
          <div className="w-full max-w-[280px] relative">
            {[
              {
                name: 'Mr. Martin Mokgware',
                position: 'Chief Executive',
                image: 'https://www.bocra.org.bw/sites/default/files/people/Martin_mokgware.jpg'
              }
            ].map((member, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 group relative shadow-md hover:shadow-xl transition-all duration-500">
                <div className="relative overflow-hidden aspect-square">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-700 contrast-[1.05] saturate-[1.05]" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <h3 className="text-lg font-bold text-white leading-tight">{member.name}</h3>
                    <p className="text-white font-medium text-xs">{member.position}</p>
                  </div>
                </div>
              </div>
            ))}
            {/* Visual Connector Line */}
            <div className="hidden lg:block absolute -bottom-12 left-1/2 -translate-x-1/2 w-px h-12 bg-gray-200 dark:bg-gray-800">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-bocra-blue"></div>
            </div>
          </div>

          {/* Directors - Row 2 (3 Males) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl w-full pt-4">
            {[
              {
                name: 'Mr. Murphy Setshwane',
                position: 'Director Business Development',
                image: 'https://www.bocra.org.bw/sites/default/files/people/Murphy_setshwane.jpg'
              },
              {
                name: 'Mr. Peter Tladinyane',
                position: 'Director Corporate Services',
                image: 'https://www.bocra.org.bw/sites/default/files/people/Peter_tladinyane.jpg'
              },
              {
                name: 'Mr. Bathopi Luke',
                position: 'Director Technical Services',
                image: 'https://www.bocra.org.bw/sites/default/files/people/Bathopi_luke.jpg'
              }
            ].map((member, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 group relative shadow-sm hover:shadow-lg transition-all duration-500">
                <div className="relative overflow-hidden aspect-square">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-700 contrast-[1.05] saturate-[1.05]" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <h3 className="text-base font-bold text-white leading-tight">{member.name}</h3>
                    <p className="text-white font-medium text-[10px] uppercase tracking-wider">{member.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Directors - Row 3 (4 Females) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full pt-4">
            {[
              {
                name: 'Ms. Bonny Mine',
                position: 'Director Finance',
                image: 'https://www.bocra.org.bw/sites/default/files/people/Bonnie_mine.jpg'
              },
              {
                name: 'Ms. Tebogo Mmoshe',
                position: 'Director of Licensing',
                image: 'https://www.bocra.org.bw/sites/default/files/people/Tebogo_mmoshe.jpg'
              },
              {
                name: 'Ms. Maitseo Ratladi',
                position: 'Director Broadband and Universal Service',
                image: 'https://www.bocra.org.bw/sites/default/files/people/Maitseo_ratladi.jpg'
              },
              {
                name: 'Ms. Joyce Isa-Molwane',
                position: 'Director Legal, Compliance & Board Secretary',
                image: 'https://www.bocra.org.bw/sites/default/files/people/Joyce-Isa-molwane.jpg'
              }
            ].map((member, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 group relative shadow-sm hover:shadow-lg transition-all duration-500">
                <div className="relative overflow-hidden aspect-square">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-700 contrast-[1.05] saturate-[1.05]" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <h3 className="text-base font-bold text-white leading-tight">{member.name}</h3>
                    <p className="text-white font-medium text-[10px] uppercase tracking-wider">{member.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  '/about/strategic-plan': {
    title: 'Strategic Plan 2024-2029',
    breadcrumbs: [{ label: 'About Us', path: '/about' }, { label: 'Strategic Plan', path: '/about/strategic-plan' }],
    sidebarLinks: aboutSidebar,
    downloads: [
      { title: 'BOCRA Strategic Plan 2024-2029', size: '4.2 MB', type: 'PDF', url: '#' },
      { title: 'Annual Performance Report 2024', size: '2.8 MB', type: 'PDF', url: '#' },
    ],
    content: (
      <div className="flex flex-col gap-12 text-gray-600 dark:text-gray-300 leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-bocra-blue dark:text-blue-400 border-b-2 border-bocra-blue pb-2 inline-block">Strategic Direction</h2>
          <p className="text-lg">
            BOCRA's Strategic Plan 2024-2029 outlines our roadmap for transforming Botswana into a digitally driven society. This plan focuses on enhancing connectivity, promoting innovation, and ensuring a fair and competitive regulatory environment.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: 'Strategic Pillar 1',
              subtitle: 'Digital Transformation',
              description: 'Accelerating the adoption of digital technologies across all sectors of the economy to drive growth and efficiency.',
              icon: Cpu,
              color: 'bg-blue-50 dark:bg-blue-900/20 text-bocra-blue dark:text-blue-400'
            },
            {
              title: 'Strategic Pillar 2',
              subtitle: 'Regulatory Excellence',
              description: 'Implementing world-class regulatory frameworks that promote fair competition and protect consumer interests.',
              icon: ShieldCheck,
              color: 'bg-blue-50 dark:bg-blue-900/20 text-bocra-blue dark:text-blue-400'
            },
            {
              title: 'Strategic Pillar 3',
              subtitle: 'Universal Access',
              description: 'Ensuring that all citizens, regardless of location, have access to high-quality and affordable communication services.',
              icon: Globe,
              color: 'bg-blue-50 dark:bg-blue-900/20 text-bocra-blue dark:text-blue-400'
            },
            {
              title: 'Strategic Pillar 4',
              subtitle: 'Organizational Efficiency',
              description: 'Building a high-performing organization through talent development, process optimization, and digital integration.',
              icon: TrendingUp,
              color: 'bg-blue-50 dark:bg-blue-900/20 text-bocra-blue dark:text-blue-400'
            }
          ].map((pillar, i) => (
            <div key={i} className="p-8 rounded-3xl border-2 border-bocra-blue dark:border-blue-500 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all group">
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", pillar.color)}>
                <pillar.icon size={28} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">{pillar.title}</span>
              <h3 className="text-xl font-bold mb-4 text-bocra-blue dark:text-blue-400">{pillar.subtitle}</h3>
              <p className="text-sm leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>

        <section className="bg-bocra-blue text-white p-10 rounded-[2.5rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <h2 className="text-3xl font-bold mb-8 relative z-10">Our Core Values</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            {[
              { label: 'Integrity', icon: UserCheck },
              { label: 'Innovation', icon: Zap },
              { label: 'Excellence', icon: Award },
              { label: 'Transparency', icon: Eye }
            ].map((value, i) => (
              <div key={i} className="flex flex-col items-center gap-4 text-center">
                <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                  <value.icon size={24} className="text-white" />
                </div>
                <span className="font-bold">{value.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  },
  '/regulatory/telecom': {
    title: 'Telecommunications Regulation',
    breadcrumbs: [{ label: 'Regulatory', path: '/regulatory' }, { label: 'Telecommunications', path: '/regulatory/telecom' }],
    sidebarLinks: regulatorySidebar,
    downloads: [
      { title: 'Telecom Guidelines 2025', size: '3.1 MB', type: 'PDF', url: '#' },
      { title: 'Quality of Service Standards', size: '1.5 MB', type: 'PDF', url: '#' },
    ],
    content: (
      <div className="flex flex-col gap-12 text-gray-600 dark:text-gray-300 leading-relaxed">
        <div className="space-y-6">
          <p className="text-xl font-medium text-bocra-blue dark:text-blue-400">
            Under the Communications Regulatory Authority Act 2012, BOCRA has authority within the guidelines established by the 1995 Telecommunication Policy to regulate telecommunications and other communications sub-sectors.
          </p>
          <p>
            The telecommunications sector, spurred by mobile technology, continues to experience significant growth in terms of the total number of consumers and variety of services. The sector has undergone numerous reforms since the introduction of competition in 1998.
          </p>
        </div>

        {/* Market Players Section */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-bocra-blue dark:text-blue-400">Market Structure & Players</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'BTCL', type: 'PTO', desc: 'Provides both fixed and mobile telephony services, data networks, and connectivity.', icon: Smartphone },
              { name: 'Mascom', type: 'PTO', desc: 'Offers mobile telephony services, mobile internet, and value-added services.', icon: Signal },
              { name: 'Orange', type: 'PTO', desc: 'Focuses on mobile telephony services, mobile internet, and value-added services.', icon: Wifi },
              { name: 'BoFiNet', type: 'Wholesale', desc: 'Wholesale provider of national and international telecommunication infrastructure.', icon: Globe }
            ].map((player, i) => (
              <div key={i} className="p-6 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                  <player.icon className="text-bocra-blue dark:text-blue-400" size={20} />
                </div>
                <div className="text-xs font-bold text-sector-broadcast mb-1 uppercase tracking-wider">{player.type}</div>
                <h3 className="text-lg font-bold text-bocra-blue dark:text-blue-400 mb-2">{player.name}</h3>
                <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">{player.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Licensing Framework Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-bocra-blue text-white p-8 rounded-[2.5rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <h3 className="text-2xl font-bold mb-6 relative z-10">Converged Licensing Framework</h3>
            <p className="text-blue-50 mb-6 relative z-10 text-sm">
              Implemented in September 2015, the new ICT licensing framework creates a more conducive environment for development, meeting demand for real-time high quality and affordable services.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                <div className="font-bold mb-1">NFP</div>
                <div className="text-xs text-blue-100">Network Facilities Provider Licence</div>
              </div>
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                <div className="font-bold mb-1">SAP</div>
                <div className="text-xs text-blue-100">Services and Applications Provider Licence</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-6 p-4">
            <h3 className="text-2xl font-bold text-bocra-blue dark:text-blue-400">Market Liberalization</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-sector-broadcast shrink-0" />
                <p className="text-sm"><strong>Private Networks:</strong> Fully liberalized for internal business use via PTNL licences.</p>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-sector-broadcast shrink-0" />
                <p className="text-sm"><strong>Terminal Equipment:</strong> No licence required for sales, but radio equipment requires BOCRA type approval.</p>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-sector-broadcast shrink-0" />
                <p className="text-sm"><strong>Internet Telephony:</strong> VANS are allowed to provide Voice over Internet Protocol (VoIP) services.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Apply for Licence Section */}
        <div className="bg-bocra-light dark:bg-gray-900/50 p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-4 text-center md:text-left">
              <h2 className="text-3xl font-bold text-bocra-blue dark:text-blue-400">Operator Licensing & Registration</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md">
                Access the official portal for telecommunications licensing. Apply for new operator licenses or view the directory of currently registered service providers in Botswana.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/licensing/telecom-registration" className="w-full sm:w-72 h-14 bg-sector-telecom text-white hover:bg-opacity-90 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 active:scale-95">
                Telecom Registration <ArrowRight size={18} />
              </Link>
              <Link 
                to="/licensing/operators" 
                className="w-full sm:w-72 h-14 bg-white dark:bg-gray-800 text-sector-telecom dark:text-blue-400 border-2 border-sector-telecom dark:border-blue-500 hover:bg-sector-telecom hover:text-white dark:hover:bg-blue-600 dark:hover:text-white rounded-xl font-bold transition-all flex items-center justify-center active:scale-95 shadow-sm"
              >
                View Registered Operators
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  },
  '/regulatory/type-approval': {
    title: 'Type Approval',
    colorScheme: 'grey',
    breadcrumbs: [{ label: 'Regulatory', path: '/regulatory' }, { label: 'Type Approval', path: '/regulatory/type-approval' }],
    sidebarLinks: regulatorySidebar,
    downloads: [
      { title: 'Type Approval Guidelines', size: '1.8 MB', type: 'PDF', url: '#' },
      { title: 'List of Approved Equipment', size: '3.2 MB', type: 'PDF', url: '#' },
      { title: 'Type Approval Application Form', size: '450 KB', type: 'DOCX', url: '#' },
    ],
    content: (
      <div className="flex flex-col gap-10 text-gray-600 dark:text-gray-300 leading-relaxed">
        <section className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900/10 p-8 rounded-3xl border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-3">
              <ShieldCheck className="text-gray-600 dark:text-gray-400" size={28} />
              Mandate & Authority
            </h2>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-4">
              BOCRA is mandated by Sec 84 of the CRA Act to Type Approve communications equipment that may be connected, used or operated to provide broadcasting or telecommunications services in Botswana.
            </p>
            <p>
              In addition, BOCRA is mandated to ensure consumer protection, ensuring that all communications equipment meets the required safety and performance standards before entering the local market.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 flex items-center gap-3">
              <Globe className="text-gray-600 dark:text-gray-400" size={24} />
              International Standards
            </h2>
            <p>
              The purpose of Type Approval procedure is to ensure that all radio communication and telecommunication equipment used in Botswana comply with international standards that are applicable in Botswana as a member of the ITU Region 1.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 flex items-center gap-3">
              <Zap className="text-gray-600 dark:text-gray-400" size={24} />
              Interference Protection
            </h2>
            <p>
              Type Approval ensures that the operating frequency of all radio communication equipment is in conformity with the Botswana frequency spectrum allocation plan to avoid causing harmful interference to essential services.
            </p>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">Type Approval Database</h2>
          <p className="mb-6">
            BOCRA maintains a comprehensive database of all type-approved equipment. This database is a public resource for consumers, retailers, and importers to verify the approval status of communications equipment in Botswana.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 text-center">
              <div className="text-2xl font-bold text-gray-700 dark:text-gray-200">5000+</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Approved Models</div>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 text-center">
              <div className="text-2xl font-bold text-gray-700 dark:text-gray-200">200+</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Manufacturers</div>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 text-center">
              <div className="text-2xl font-bold text-gray-700 dark:text-gray-200">Daily</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Database Updates</div>
            </div>
          </div>
          <p className="text-sm italic">
            Importers and distributors are encouraged to consult the database before importing equipment to ensure compliance with national regulations.
          </p>
        </section>

        <section className="bg-gray-100 dark:bg-gray-900/50 p-10 rounded-[2.5rem] border border-gray-200 dark:border-gray-800 relative overflow-hidden group">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-4 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-200">Equipment Portal</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md">
                Access the official BOCRA Type Approval Database or submit a new application for equipment approval.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/licensing/approved-equipment" className="w-full sm:w-72 h-14 bg-gray-700 text-white hover:bg-gray-800 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-gray-900/20 active:scale-95">
                Search Type Approval <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  },
  '/regulatory/broadcasting': {
    title: 'Broadcasting Regulation',
    colorScheme: 'green',
    breadcrumbs: [{ label: 'Regulatory', path: '/regulatory' }, { label: 'Broadcasting', path: '/regulatory/broadcasting' }],
    sidebarLinks: regulatorySidebar,
    downloads: [
      { title: 'Broadcasting Guidelines', size: '2.1 MB', type: 'PDF', url: '#' },
      { title: 'Code of Practice for Broadcasters', size: '1.5 MB', type: 'PDF', url: '#' },
    ],
    content: (
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-6 text-gray-600 dark:text-gray-300 leading-relaxed">
          <p className="text-lg font-medium text-sector-broadcast dark:text-green-400">BOCRA regulates the broadcasting sector to ensure diverse, high-quality content and fair competition among service providers.</p>
          <p>Our mandate includes licensing of commercial, community, and subscription-based broadcasting services, as well as monitoring compliance with broadcasting standards and the Code of Practice.</p>
        </div>

        {/* Broadcasting Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'Commercial Radio', desc: 'Private radio stations operating for profit, providing news, music, and entertainment.', icon: Radio },
            { title: 'Commercial TV', desc: 'Private television stations offering a variety of programming to the general public.', icon: Monitor },
            { title: 'Community Radio', desc: 'Non-profit radio services catering to specific geographical communities or interest groups.', icon: Users },
            { title: 'Subscription TV', desc: 'Television services provided to subscribers for a fee, often via satellite or cable.', icon: Tv }
          ].map((cat, i) => (
            <div key={i} className="p-6 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center mb-4">
                <cat.icon className="text-sector-broadcast dark:text-green-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-sector-broadcast dark:text-green-400 mb-2">{cat.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">{cat.desc}</p>
            </div>
          ))}
        </div>

        {/* Content Standards Section */}
        <div className="bg-sector-broadcast text-white p-10 rounded-[2.5rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-6">Broadcasting Standards</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <h4 className="font-bold text-green-200 uppercase tracking-wider text-xs">Local Content</h4>
                <p className="text-sm text-green-50">Ensuring a minimum percentage of locally produced content to promote Botswana's culture and talent.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-green-200 uppercase tracking-wider text-xs">Public Interest</h4>
                <p className="text-sm text-green-50">Broadcasters must serve the public interest by providing accurate news and educational programming.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-green-200 uppercase tracking-wider text-xs">Child Protection</h4>
                <p className="text-sm text-green-50">Strict guidelines on programming content during hours when children are likely to be watching or listening.</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-green-200 uppercase tracking-wider text-xs">Fair Competition</h4>
                <p className="text-sm text-green-50">Preventing anti-competitive behavior and ensuring a level playing field for all broadcasters.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Section */}
        <div className="bg-green-50/50 dark:bg-green-900/10 p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-4 text-center md:text-left">
              <h2 className="text-3xl font-bold text-sector-broadcast dark:text-green-400">Broadcasting Registration</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md">
                Register your broadcasting service with BOCRA. Apply for new licenses or renew existing ones through our simplified online portal.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/licensing/broadcasting-registration" className="w-full sm:w-72 h-14 bg-sector-broadcast text-white hover:bg-opacity-90 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-900/20 active:scale-95">
                Broadcasting Registration <ArrowRight size={18} />
              </Link>
              <Link 
                to="/licensing/broadcasters" 
                className="w-full sm:w-72 h-14 bg-white dark:bg-gray-800 text-sector-broadcast dark:text-green-400 border-2 border-sector-broadcast dark:border-green-500 hover:bg-sector-broadcast hover:text-white dark:hover:bg-green-600 dark:hover:text-white rounded-xl font-bold transition-all flex items-center justify-center active:scale-95 shadow-sm"
              >
                View Registered Broadcasters
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  },
  '/regulatory/internet': {
    title: 'Internet Services',
    colorScheme: 'yellow',
    breadcrumbs: [{ label: 'Regulatory', path: '/regulatory' }, { label: 'Internet Services', path: '/regulatory/internet' }],
    sidebarLinks: regulatorySidebar,
    sidebarContent: <InternetDocuments />,
    content: (
      <div className="flex flex-col gap-10 text-gray-600 dark:text-gray-300 leading-relaxed">
        <section className="space-y-4">
          <p className="text-xl font-medium text-sector-internet dark:text-yellow-400">
            BOCRA regulates the internet sector to ensure fair competition, consumer protection, and the promotion of universal access to high-quality internet services.
          </p>
          <p>
            The Communications Regulatory Authority Act 2012 mandates BOCRA to regulate the communications sector in Botswana, comprising among others the Internet and Information and Communications Technologies (ICTs). BOCRA facilitates the growth of the Internet market as part of its role to facilitate the uptake of ICTs, driven by the increased use of smartphones and mobile internet access.
          </p>
        </section>

        <section className="bg-yellow-50 dark:bg-yellow-900/10 p-8 rounded-3xl border border-yellow-100 dark:border-yellow-900/30">
          <h2 className="text-2xl font-bold text-sector-internet dark:text-yellow-400 mb-4">Internet Connectivity & Pricing</h2>
          <p className="mb-4">
            To improve the performance of the Internet, BOCRA issued <strong>Guidelines on Minimum Requirements for Internet Connectivity in Hospitality Facilities</strong>, setting minimum standards for connectivity in the industry.
          </p>
          <p>
            Wholesale Internet bandwidth prices have been declining, influenced by the acquisition of capacity through the East Africa Sub Marine System (EASSy) and West Africa Cable System (WACS) undersea cable systems, in line with international trends.
          </p>
        </section>

        <h2 className="text-2xl font-bold text-sector-internet dark:text-yellow-400">Key Internet Initiatives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: '.BW ccTLD', desc: 'Management of the national .bw domain as a public resource.', icon: Globe, link: 'https://www.nic.net.bw' },
            { title: 'bw CIRT', desc: 'Communications Sector Computer Incidence Response Team.', icon: ShieldCheck, link: 'https://www.cirt.org.bw' },
            { title: 'Electronic Evidence', desc: 'Certification of electronic systems for legal admissibility.', icon: FileText, link: '#' },
            { title: 'Electronic Transactions', desc: 'Accreditation of Secure Electronic Signature Service Providers.', icon: Zap, link: '#' }
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center">
                <item.icon className="text-sector-internet dark:text-yellow-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-sector-internet dark:text-yellow-400">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex-grow">{item.desc}</p>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-sector-internet hover:underline flex items-center gap-1">
                Learn More <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>

        {/* Registration Section */}
        <div className="bg-yellow-50 dark:bg-yellow-900/10 p-10 rounded-[2.5rem] border border-yellow-100 dark:border-yellow-900/30 relative overflow-hidden group">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-4 text-center md:text-left">
              <h2 className="text-3xl font-bold text-sector-internet dark:text-yellow-400">Internet Service Provider Registration</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md">
                Register your internet service provider with BOCRA. Apply for new licenses or renew existing ones through our simplified online portal.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/licensing/internet-registration" className="w-full sm:w-72 h-14 bg-sector-internet text-white hover:bg-opacity-90 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-yellow-900/20 active:scale-95">
                ISP Registration <ArrowRight size={18} />
              </Link>
              <Link 
                to="/licensing/isps" 
                className="w-full sm:w-72 h-14 bg-white dark:bg-gray-800 text-sector-internet dark:text-yellow-400 border-2 border-sector-internet dark:border-yellow-500 hover:bg-sector-internet hover:text-white dark:hover:bg-yellow-600 dark:hover:text-white rounded-xl font-bold transition-all flex items-center justify-center active:scale-95 shadow-sm"
              >
                View Registered ISPs
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  },
  '/regulatory/postal': {
    title: 'Postal Services Regulation',
    colorScheme: 'maroon',
    breadcrumbs: [{ label: 'Regulatory', path: '/regulatory' }, { label: 'Postal Services', path: '/regulatory/postal' }],
    sidebarLinks: regulatorySidebar,
    sidebarContent: <PostalDocuments />,
    content: (
      <div className="flex flex-col gap-10 text-gray-600 dark:text-gray-300 leading-relaxed">
        <section className="space-y-4">
          <p className="text-xl font-medium text-sector-postal dark:text-red-400">
            The CRA Act, 2012 ushered in a new dawn of regulation for the postal sector as BOCRA assumed the mandate of supervising the provision of postal services in Botswana.
          </p>
          <p>
            The CRA Act prohibits any person to provide postal services without a valid licence issued by BOCRA. The Authority is also mandated to ensure that there is provision of safe, reliable, efficient and affordable postal services throughout Botswana.
          </p>
          <p>
            In line with this, the Authority has prepared the ground for regulation of postal services by putting in place regulatory instruments and tools that allows ease of market entry and supports innovation for the provision of varied postal service offerings. These regulatory instruments include among others, the Postal Sector Licensing Framework to guide the provision of postal services in the country and Licence Application Requirements for licensing of courier service providers.
          </p>
        </section>

        <section className="bg-red-50 dark:bg-red-900/10 p-8 rounded-3xl border border-red-100 dark:border-red-900/30">
          <h2 className="text-2xl font-bold text-sector-postal dark:text-red-400 mb-4">Current Market Structure</h2>
          <p className="mb-4">
            The Botswana postal market comprises of two main categories of postal services which include the following:
          </p>
          <ul className="list-decimal list-inside space-y-2">
            <li><strong>Ordinary Mail Services or Universal Postal Services:</strong> These are mail services provided nation-wide, under the same conditions for all citizens and customers and delivered into the P.O. Box. These services are only provided by the Designated Public Postal Operator.</li>
            <li><strong>Courier Services or Value-added Services:</strong> These are services provided on a commercial basis and delivered directly to the addressee. These services are mainly provided by courier service providers. However, the Designated Public Postal Operator can also provide these services on a commercial basis.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-sector-postal dark:text-red-400 mb-4">Licensing of Postal Operators</h2>
          <p className="mb-4">The licensing framework for the Postal Sector in Botswana comprises of two licence categories:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
              <h3 className="text-xl font-bold text-sector-postal dark:text-red-400 mb-2">Public Postal Operator Licence</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Issued to only one postal service provider, designated by the Minister. Valid for 15 years.</p>
            </div>
            <div className="p-6 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
              <h3 className="text-xl font-bold text-sector-postal dark:text-red-400 mb-2">Commercial Postal Operator Licence</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Issued to operators providing courier services or value-added services. Valid for 10 years.</p>
            </div>
          </div>
        </section>

        <section className="bg-red-50 dark:bg-red-900/10 p-10 rounded-[2.5rem] border border-red-100 dark:border-red-900/30">
          <h2 className="text-2xl font-bold text-sector-postal dark:text-red-400 mb-4">Designation of a Public Postal Operator</h2>
          <p>
            Pursuant to Section 67 of the CRA Act, the Minister responsible for Communications shall, on the recommendation of the Authority designate one postal service provider as a Public Postal Operator. A Public Postal Operator carries a number of universal service obligations aimed at ensuring that, so far as it is practicable, postal services reach all inhabitants of Botswana.
          </p>
        </section>

        <section className="bg-red-50 dark:bg-red-900/10 p-10 rounded-[2.5rem] border border-red-100 dark:border-red-900/30 relative overflow-hidden group">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-4 text-center md:text-left">
              <h2 className="text-3xl font-bold text-sector-postal dark:text-red-400">Postal Operator Registration</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md">
                Register your postal or courier service with BOCRA. Apply for new licenses through our simplified online portal.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/licensing/postal-registration" className="w-full sm:w-72 h-14 bg-sector-postal text-white hover:bg-red-700 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-900/20 active:scale-95">
                Postal Registration <ArrowRight size={18} />
              </Link>
              <Link 
                to="/licensing/postal-providers" 
                className="w-full sm:w-72 h-14 bg-white dark:bg-gray-800 text-sector-postal dark:text-red-400 border-2 border-sector-postal dark:border-red-500 hover:bg-sector-postal hover:text-white dark:hover:bg-red-700 dark:hover:text-white rounded-xl font-bold transition-all flex items-center justify-center active:scale-95 shadow-sm"
              >
                View Registered Providers
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  },
  '/regulatory/spectrum': {
    title: 'Spectrum Management',
    colorScheme: 'violet',
    breadcrumbs: [
      { label: 'Regulatory', path: '/regulatory' },
      { label: 'Spectrum Management', path: '/regulatory/spectrum' },
    ],
    content: (
      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-6">
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white">National Radio Frequency Spectrum</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            The radio frequency spectrum is a finite national resource essential for the development of the digital economy. BOCRA is mandated to ensure its efficient and effective management to support various services including mobile communications, broadcasting, aviation, maritime, and emergency services.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="p-6 bg-violet-50 dark:bg-violet-900/10 border border-violet-100 dark:border-violet-800 rounded-2xl shadow-sm">
              <h3 className="font-bold text-violet-900 dark:text-violet-300 mb-2">Spectrum Planning</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Developing and maintaining the National Radio Frequency Plan in alignment with international standards (ITU).</p>
            </div>
            <div className="p-6 bg-violet-50 dark:bg-violet-900/10 border border-violet-100 dark:border-violet-800 rounded-2xl shadow-sm">
              <h3 className="font-bold text-violet-900 dark:text-violet-300 mb-2">Spectrum Licensing</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Issuing licenses for the use of radio frequencies to ensure orderly access and prevent interference.</p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Key Management Functions</h2>
          <div className="flex flex-col gap-4">
            {[
              {
                title: 'Frequency Allocation',
                desc: 'Designating specific frequency bands for particular types of radiocommunication services.'
              },
              {
                title: 'Spectrum Monitoring',
                desc: 'Continuous observation of the radio environment to ensure compliance with license conditions and detect unauthorized use.'
              },
              {
                title: 'Interference Resolution',
                desc: 'Investigating and resolving cases of harmful interference between different radio users.'
              },
              {
                title: 'International Coordination',
                desc: 'Coordinating with neighboring countries and international bodies to prevent cross-border interference.'
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm">
                <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400 font-bold shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-violet-600 rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-4 text-center md:text-left">
              <h2 className="text-3xl font-display font-bold">Spectrum Licensing</h2>
              <p className="text-violet-100 max-w-md">
                Apply for radio frequency spectrum licenses or renew existing ones through our online portal.
              </p>
            </div>
            <Link 
              to="/licensing/spectrum-registration" 
              className="px-8 py-4 bg-white text-violet-600 rounded-xl font-bold hover:bg-violet-50 transition-all shadow-lg whitespace-nowrap"
            >
              Apply for License
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        </section>
      </div>
    ),
    sidebarLinks: regulatorySidebar,
    downloads: [
      { title: 'National Radio Frequency Plan 2024', type: 'PDF', size: '4.2 MB', url: '#' },
      { title: 'Spectrum Fees Schedule', type: 'PDF', size: '1.1 MB', url: '#' },
      { title: 'Guidelines for Interference Resolution', type: 'PDF', size: '2.5 MB', url: '#' },
    ]
  },
  '/consumer/rights-and-education': {
    title: 'Consumer Rights & Education',
    breadcrumbs: [{ label: 'Consumer', path: '/consumer' }, { label: 'Consumer Rights & Education', path: '/consumer/rights-and-education' }],
    sidebarLinks: consumerSidebar,
    content: (
      <div className="flex flex-col gap-12 text-gray-600 dark:text-gray-300 leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-bocra-blue dark:text-blue-400 border-b-2 border-bocra-blue pb-2 inline-block">Your Rights as a Consumer</h2>
          <p className="text-lg">
            Every user of communications services in Botswana is entitled to specific rights. BOCRA is committed to ensuring these rights are protected and that consumers are educated about their responsibilities and online safety.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'Right to Information', desc: 'To receive clear, accurate, and up-to-date information about services and prices.', icon: HelpCircle },
            { title: 'Right to Choice', desc: 'To choose from a variety of service providers and products that meet your needs.', icon: CheckCircle2 },
            { title: 'Right to Quality', desc: 'To receive reliable services that meet the quality standards set by BOCRA.', icon: ShieldCheck },
            { title: 'Right to Privacy', desc: 'To have your personal data and communications kept private and secure.', icon: ShieldCheck },
            { title: 'Right to Redress', desc: 'To have your complaints resolved fairly and efficiently by your provider or BOCRA.', icon: MessageSquare },
            { title: 'Right to Safety', desc: 'To be protected from harmful content and unfair commercial practices.', icon: AlertTriangle },
          ].map((right, i) => (
            <div key={i} className="p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all flex gap-4">
              <div className="w-12 h-12 bg-bocra-light dark:bg-gray-800 text-bocra-blue dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                <right.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-bocra-blue dark:text-blue-400 mb-2">{right.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{right.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <section className="bg-bocra-light dark:bg-gray-900/50 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 space-y-6">
          <div className="flex items-center gap-4">
            <div className="bg-bocra-blue p-3 rounded-2xl">
              <ShieldCheck className="text-white" size={28} />
            </div>
            <h2 className="text-3xl font-bold text-bocra-blue dark:text-blue-400">Online Safety</h2>
          </div>
          <p className="text-lg">
            As the digital landscape evolves, staying safe online is more important than ever. BOCRA provides guidelines and educational resources to help you navigate the internet securely.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-bocra-blue dark:text-blue-400 mb-3">Protecting Personal Data</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Always use strong, unique passwords for your accounts. Be cautious about sharing personal information on social media and ensure your privacy settings are configured correctly.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-bocra-blue dark:text-blue-400 mb-3">Avoiding Scams</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Be wary of unsolicited emails, messages, or calls asking for personal or financial information. Verify the source before clicking on links or downloading attachments.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-bocra-blue dark:text-blue-400 mb-3">Child Online Protection</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Educate children about the risks of the internet. Use parental controls to restrict access to inappropriate content and monitor their online activities.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-bocra-blue dark:text-blue-400 mb-3">Secure Connections</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Avoid using public Wi-Fi for sensitive transactions like banking. Ensure websites use HTTPS before entering any personal information.
              </p>
            </div>
          </div>
        </section>
      </div>
    )
  },
  '/consumer/complaints': {
    title: 'Log a Complaint',
    breadcrumbs: [{ label: 'Consumer', path: '/consumer' }, { label: 'Log a Complaint', path: '/redirect?to=https://studio--loanmanagement-2381a.us-central1.hosted.app/consumer/complaints' }],
    sidebarLinks: consumerSidebar,
    content: (
      <div className="flex flex-col gap-8">
        <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
          <p className="text-lg font-medium text-bocra-blue dark:text-blue-400 mb-4">
            BOCRA provides a platform for consumers to lodge complaints against service providers if they are not satisfied with the service or resolution provided.
          </p>
          <p>
            Before submitting a complaint to BOCRA, please ensure you have first attempted to resolve the issue directly with your service provider and have obtained a reference number.
          </p>
        </div>
        
        <div className="bg-bocra-light dark:bg-gray-900 p-8 rounded-3xl mb-12 border border-bocra-blue/10">
          <h3 className="text-2xl font-bold text-bocra-blue dark:text-blue-400 mb-6">Access the Complaint Portal</h3>
          <p className="mb-8">Our new online complaint management system allows you to lodge, track, and manage your complaints efficiently.</p>
          <Link 
            to="/redirect?to=https://studio--loanmanagement-2381a.us-central1.hosted.app/consumer/complaints" 
            className="btn-primary inline-flex items-center gap-2"
          >
            Go to Complaint Portal <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }
};

// Add generic fallbacks for the other routes to avoid errors
const genericRoutes = [
];

genericRoutes.forEach(route => {
  subpagesData[route.path] = {
    title: route.title,
    breadcrumbs: [{ label: route.parent, path: route.parentPath }, { label: route.title, path: route.path }],
    sidebarLinks: route.sidebar,
    content: (
      <div className="flex flex-col gap-6 text-gray-600 dark:text-gray-300 leading-relaxed">
        <p className="text-lg font-medium text-bocra-blue dark:text-blue-400">Detailed information regarding {route.title} is currently being updated.</p>
        <p>Please check back later for comprehensive guidelines, documents, and resources related to this section. In the meantime, you can explore the related links in the sidebar or contact us for specific inquiries.</p>
        <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-3xl mt-8 flex items-center justify-center border border-gray-200 dark:border-gray-700">
          <span className="text-gray-400 dark:text-gray-500 font-medium">Content Placeholder</span>
        </div>
      </div>
    )
  };
});
