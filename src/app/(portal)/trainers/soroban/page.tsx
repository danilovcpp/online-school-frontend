import { Card } from "@/components/Card/Card";

const SorobanPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 py-5">
      <header className="text-center py-10">
        <h1 className="text-5xl font-extrabold mb-3">Соробан</h1>
        <h2 className="block text-lg font-light text-white/70 mt-3">
          Традиционный японский счётный инструмент
        </h2>
      </header>

      <main>
        <Card>
          <div className="text-center py-20">
            <div className="text-6xl mb-5">🎴</div>
            <h2 className="text-3xl mb-5 text-white">В разработке</h2>
            <p className="text-white/70 text-lg">
              Этот тренажер скоро будет доступен. Следите за обновлениями!
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default SorobanPage;
