import Dashboard from "./dashboard/page";

export default async function HomePrivate() {
  return (
    <div className="flex gap-2 mb-2">
        <h1>Esta é uma área restrita.</h1>
        <Dashboard/>
    </div>
  );
}