import Meetings from "../components/Meetings";

const MeetingArchive = () => {
  return (
    <section className="flex flex-col mt-16 gap-8">
      <h2 className="text-2xl sm:text-3xl">Archives</h2>
      <Meetings />
    </section>
  );
};
export default MeetingArchive;
