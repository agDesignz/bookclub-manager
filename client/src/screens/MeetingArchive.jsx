import Meetings from "../components/Meetings";

const MeetingArchive = () => {
  return (
    <section className="flex flex-col mt-16 gap-8">
      <h2 className="text-2xl sm:text-3xl">Archives</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        <Meetings />
      </div>
    </section>
  );
};
export default MeetingArchive;
