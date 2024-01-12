import Weather from "./(components)/Weather/Weather";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <Weather />
    </main>
  );
}
