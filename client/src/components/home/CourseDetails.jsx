import { useParams } from "react-router";
import useFindSingleCourse from "../../hooks/useFindSingleCourse";
import Loading from "./Loading";
import {
  User,
  BookOpen,
  DollarSign,
  ArrowLeft,
  CheckCircle2,
  Globe,
  Clock,
} from "lucide-react";
import { Link } from "react-router";

const CourseDetails = () => {
  const params = useParams();
  const courseId = params.id;

  const { course, isLoading } = useFindSingleCourse(courseId);
  const courseData = course?.data;

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-white py-8  font-sans">
      <div className="">
        {/* Breadcrumb - Subtle & Clean */}
        <nav className="mb-8">
          <Link
            to="/courses"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="mr-2 group-hover:-translate-x-1 transition-transform"
            />
            Back to Course Catalog
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-100">
                  {courseData?.category}
                </span>
                <span className="text-gray-400 text-sm">•</span>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock size={14} className="mr-1" />
                  Self-paced
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                {courseData?.title}
              </h1>

              <div className="flex items-center gap-4 text-gray-600 border-b border-gray-100 pb-8">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center text-gray-500 font-bold text-xs">
                    {courseData?.teacher?.charAt(0)}
                  </div>
                  <span className="text-sm font-medium">
                    Instructor:{" "}
                    <span className="text-gray-900">{courseData?.teacher}</span>
                  </span>
                </div>
              </div>
            </header>

            <div className="space-y-10">
              {/* Media Section */}
              <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                <img
                  src={courseData?.thumbnail}
                  alt={courseData?.title}
                  className="w-full h-auto aspect-video object-cover"
                />
              </div>

              {/* Description Section */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  About this course
                </h2>
                <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed text-lg">
                  {courseData?.description}
                </div>
              </section>

              {/* Simple Specs Grid */}
              <section className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-lg border border-gray-100 bg-gray-50/50">
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">
                    Department
                  </p>
                  <p className="text-gray-900 font-medium">
                    {courseData?.category}
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-gray-100 bg-gray-50/50">
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">
                    Language
                  </p>
                  <p className="text-gray-900 font-medium">English</p>
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar - Sticky Action Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 rounded-xl border border-gray-200 bg-white p-6 transition-all">
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Course Investment
                </p>
                <div className="flex items-baseline text-3xl font-bold text-gray-900">
                  <span className="text-2xl mr-0.5">$</span>
                  <span>{courseData?.course_fee}</span>
                </div>
              </div>

              <button className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3.5 rounded-lg transition-all mb-4 text-center">
                Enroll in Course
              </button>

              <p className="text-center text-xs text-gray-400 mb-6">
                30-Day Money-Back Guarantee
              </p>

              <div className="space-y-4 border-t border-gray-100 pt-6">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-tight">
                  Includes:
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start text-sm text-gray-600">
                    <CheckCircle2
                      size={18}
                      className="mr-3 text-green-500 shrink-0"
                    />
                    <span>Lifetime access to materials</span>
                  </li>
                  <li className="flex items-start text-sm text-gray-600">
                    <CheckCircle2
                      size={18}
                      className="mr-3 text-green-500 shrink-0"
                    />
                    <span>Verified certificate of completion</span>
                  </li>
                  <li className="flex items-start text-sm text-gray-600">
                    <Globe size={18} className="mr-3 text-gray-400 shrink-0" />
                    <span>100% Online & Mobile friendly</span>
                  </li>
                </ul>
              </div>

              <button className="w-full mt-6 py-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors border border-transparent hover:border-gray-200 rounded-lg">
                Share this course
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
