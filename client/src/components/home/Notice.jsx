import React from "react";
import SectionHeading from "../shared/SectionHeading";
import useNotice from "../../hooks/useNotice";

const Notice = () => {
  const { allNotice } = useNotice();

  const notices = allNotice?.data;

  return (
    <div className="py-20">
      <SectionHeading
        title="Notice"
        subTitle="Latest updates and announcements"
      />
      {/* Render notices here */}

      <div className="grid grid-cols-2 mt-10 gap-5">
        {notices?.map((notice) => {
          return (
            <div
              key={notice._id}
              className="border p-4 rounded-sm border-gray-400"
            >
              <h1 className="text-2xl font-semibold mb-3">{notice.title}</h1>
              <p>{notice.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notice;
