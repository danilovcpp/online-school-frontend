import { GuessResultPage } from '@/features/trainers/pages/guess-result/guess-result';

const Page = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 py-5">
      <header className="text-center py-10">
        <h1 className="text-5xl font-extrabold mb-3">Угадай результат</h1>
        <h2 className="block text-lg font-light text-white/70 mt-3">Тренируйте память и ментальный счет</h2>
      </header>

      <main>
        <GuessResultPage />
      </main>
    </div>
  );
};

export default Page;
