import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <h1>Lyrify</h1>
      <div>
        <Image
          alt="logo"
          width={400}
          height={400}
          src={"/logo-new.svg"}
        ></Image>
      </div>
    </main>
  );
}
