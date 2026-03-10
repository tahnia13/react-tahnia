export default function HelloWorld() {
  const propsUserCard = {
    nama: "nia",
    nim: "2457301140",
    tanggal: "2025-06-01",
  };

  return (
    <div>
      <h1>Hello World</h1>
      <img src="img/lucu.png" alt="lucu" width={1000} />
      <p>Selamat Belajar ReactJs</p>
      <GreetingBinjai />
      <QuoteText />
      <UserCard
        nama="Tahnia"
        nim="2457301141"
        tanggal={new Date().toLocaleDateString()}
      />

      <UserCard {...propsUserCard} />
    </div>
  );
}

function QuoteText() {
  const text = "Mulutmu harimaumu";
  const text2 = "Aku ingin jadi macan";
  return (
    <div>
      <hr />
      <p>{text.toLowerCase()}</p>
      <p>{text2.toLowerCase()}</p>
    </div>
  );
}

function GreetingBinjai() {
  return <small>Salam dari Binjai</small>;
}

function UserCard(props) {
  return (
    <div>
      <hr />
      <h3>Nama: {props.nama}</h3>
      <p>NIM: {props.nim}</p>
      <p>Tanggal: {props.tanggal}</p>
    </div>
  );
}
