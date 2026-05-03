import { useState, useMemo } from "react";

/**
 * Gera o path SVG de uma curva normal (gaussiana) em viewBox 1000x500.
 * Fórmula: y = exp(-x²/2σ²)
 * yOffset = deslocamento vertical em unidades do viewBox
 */
function gaussianPath(yOffset: number, amplitude = 240, sigma = 80): string {
  const cx = 500;
  const baseY = 380;
  const points: string[] = [];
  for (let x = -50; x <= 1050; x += 8) {
    const dx = x - cx;
    const y = baseY - amplitude * Math.exp(-(dx * dx) / (2 * sigma * sigma)) + yOffset;
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return "M " + points.join(" L ");
}

/**
 * Calcula um comprimento aproximado do path (suficiente pra animação stroke-dasharray).
 * Não precisa ser exato — só precisa ser >= o comprimento real.
 */
function approxPathLength(amplitude = 240, sigma = 80): number {
  // Path vai de x=-50 a x=1050, soma incrementos pequenos da hipotenusa
  const cx = 500;
  const baseY = 380;
  let length = 0;
  let prevY = baseY - amplitude * Math.exp(-((-50 - cx) ** 2) / (2 * sigma * sigma));
  let prevX = -50;
  for (let x = -50 + 4; x <= 1050; x += 4) {
    const y = baseY - amplitude * Math.exp(-((x - cx) ** 2) / (2 * sigma * sigma));
    length += Math.hypot(x - prevX, y - prevY);
    prevX = x;
    prevY = y;
  }
  return Math.ceil(length);
}

/**
 * Onda da capa: 5 curvas normais paralelas, espaçadas verticalmente.
 * Inspirada na capa de Estatística Básica (Luiz Gonzaga Morettin, LCTE, 1979).
 */
function NormalWave() {
  const offsets = [0, 22, 44, 66, 88];
  // Comprimento usado pra animar o desenho da linha. Memoizado pra não recalcular.
  const pathLength = useMemo(() => approxPathLength(), []);

  return (
    <svg
      viewBox="0 0 1000 500"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      {offsets.map((offset, i) => (
        <path
          key={i}
          d={gaussianPath(offset)}
          fill="none"
          stroke="hsl(var(--book-ink))"
          strokeWidth="9"
          strokeLinecap="round"
          className="normal-wave-path"
          style={{ ["--path-length" as string]: pathLength } as React.CSSProperties}
        />
      ))}
    </svg>
  );
}

const Index = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="bg-organic min-h-screen w-full relative overflow-hidden flex items-center justify-center px-6 py-10">
      {/* Onda — fica atrás dos links, ocupa o stage central */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-[1200px] aspect-[2/1]">
          <NormalWave />
        </div>
      </div>

      {/* Conteúdo: links empilhados sobre a onda, alinhados ao centro */}
      <div className="relative z-10 w-full max-w-[1200px] flex flex-col items-center fade-up">
        <nav className="flex flex-col gap-3 sm:gap-4 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-foreground">
          <a
            href="https://bisque.lovable.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity"
          >
            BISQUE
          </a>
          <a
            href="https://kadenza.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity"
          >
            KADENZA
          </a>
          <span className="opacity-50 cursor-default select-none">
            SKYER (SOON)
          </span>
          <button
            onClick={() => setShowInfo(true)}
            className="hover:opacity-60 transition-opacity text-left"
          >
            INFO
          </button>
        </nav>
      </div>

      {/* Modal info — fundo orgânico mantido, texto centrado */}
      {showInfo && (
        <div
          className="bg-organic fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-10 cursor-pointer overflow-y-auto"
          onClick={() => setShowInfo(false)}
        >
          <article className="relative z-10 max-w-xl w-full text-foreground text-base sm:text-lg leading-relaxed space-y-5 tracking-tight">
            <p>
              Esse site toma emprestado como inspiração a capa do primeiro livro
              do meu pai, <em>Estatística Básica</em>, publicado em 1979.
            </p>
            <p>
              Luiz Gonzaga Morettin foi matemático e estatístico. Formou-se na
              USP, deu aula por mais de cinquenta anos em faculdades como PUC e
              FEI, e escreveu livros que ainda hoje ensinam gente que ele nunca
              conheceu.
            </p>
            <p>
              A curva da capa dele me ensinou cedo que é possível representar o
              mundo com poucos traços. Eu ficava horas olhando essa onda e
              tentando, em vão, entender seu significado nas equações e
              problemas explicados ao longo do livro.
            </p>
            <p>
              Essa onda ao fundo é uma curva normal. O nome que a estatística dá
              pra forma como o aleatório encontra ordem. Como ideias que nascem
              do nada e que podem virar projetos pequenos, específicos. Coisas
              que não precisam necessariamente chegar até todos, só precisam
              existir. Que durem o suficiente pra encontrar quem precisa delas.
            </p>
          </article>
        </div>
      )}
    </div>
  );
};

export default Index;
