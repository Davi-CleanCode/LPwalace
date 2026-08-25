import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'motion/react'

const WHATSAPP_NUMBER = '5511949460309'
const WHATSAPP_MSG = encodeURIComponent('Olá, Walace! Gostaria de saber mais sobre o atendimento psicológico online.')
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`

const HERO_IMG =
  'https://images.unsplash.com/photo-1714976694468-1dab37879a76?w=1800&h=1200&fit=crop&auto=format'

const WALACE_IMG = '/walace02.jpg'

const SERVICES = [
  { number: '01', label: 'Identidade', short: 'Autoconhecimento', desc: 'Autoconhecimento e construção de uma identidade sólida e autêntica.' },
  { number: '02', label: 'Inteligência Emocional', short: 'Emoções', desc: 'Reconheça, compreenda e gerencie suas emoções com mais clareza.' },
  { number: '03', label: 'Medos e Fobias', short: 'Enfrentamento', desc: 'Enfrentamento gradual e ressignificação de medos limitantes.' },
  { number: '04', label: 'Habilidades Sociais', short: 'Relacionamentos', desc: 'Desenvolva comunicação assertiva e relacionamentos mais saudáveis.' },
  { number: '05', label: 'Ansiedade', short: 'Terapia', desc: 'Tratamento baseado em evidências para compreender e aliviar o sofrimento.' },
  { number: '06', label: 'Depressão', short: 'Acolhimento', desc: 'Um espaço seguro para compreender padrões e construir novos caminhos.' },
  { number: '07', label: 'Autismo', short: 'TEA', desc: 'Suporte especializado para adultos no espectro autista.' },
  { number: '08', label: 'TDAH', short: 'Organização', desc: 'Estratégias práticas para foco, organização e regulação emocional.' },
]

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold })

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

export default function App() {
  const [aware, setAware] = useState(false)
  const [checked, setChecked] = useState(false)

  const ctaSection = useInView(0.2)
  const storyRef = useRef<HTMLDivElement>(null)
  const [sceneProgress, setSceneProgress] = useState(0)

  // Use the browser's scroll position as the source of truth for the pinned
  // Motion scene. This avoids target/offset calculation issues with sticky
  // sections in different browsers/dev servers.
  useEffect(() => {
    let frame = 0

    const updateScene = () => {
      frame = 0
      const scene = storyRef.current
      if (!scene) return

      const rect = scene.getBoundingClientRect()
      const scrollableDistance = Math.max(scene.offsetHeight - window.innerHeight, 1)
      const progress = Math.min(Math.max(-rect.top / scrollableDistance, 0), 1)

      setSceneProgress(progress)
    }

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScene)
    }

    updateScene()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateScene)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateScene)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  const sceneProgressMotion = useMotionValue(0)

  useEffect(() => {
    sceneProgressMotion.set(sceneProgress)
  }, [sceneProgress, sceneProgressMotion])

  const scrollProgress = sceneProgressMotion

  // HERO
  const heroOpacity = useTransform(scrollProgress, [0, 0.22, 0.34], [1, 1, 0])
  const heroScale = useTransform(scrollProgress, [0, 0.34], [1, 1.045])

  const eyebrowY = useTransform(scrollProgress, [0, 0.20, 0.34], [0, -18, -100])
  const eyebrowOpacity = useTransform(scrollProgress, [0, 0.20, 0.34], [1, 0.75, 0])

  const headlineY = useTransform(scrollProgress, [0, 0.18, 0.34], [0, -12, -180])
  const headlineScale = useTransform(scrollProgress, [0, 0.20, 0.34], [1, 0.98, 0.78])
  const headlineOpacity = useTransform(scrollProgress, [0, 0.22, 0.34], [1, 1, 0])

  const heroTextY = useTransform(scrollProgress, [0, 0.20, 0.34], [0, -10, -70])
  const heroTextOpacity = useTransform(scrollProgress, [0, 0.20, 0.34], [1, 0.8, 0])

  // DOCTOR / PROFILE TRANSITION
  const doctorOpacity = useTransform(
    scrollProgress,
    [0.08, 0.18, 0.28, 0.62, 0.72],
    [0, 0.55, 1, 1, 0]
  )

  const doctorX = useTransform(
    scrollProgress,
    [0.08, 0.22, 0.42, 0.62, 0.72],
    [110, 0, 0, 0, 90]
  )

  const doctorY = useTransform(
    scrollProgress,
    [0.08, 0.22, 0.42, 0.62, 0.72],
    [80, 0, 0, 0, -25]
  )

  const doctorScale = useTransform(
    scrollProgress,
    [0.08, 0.22, 0.42, 0.62, 0.72],
    [0.72, 0.92, 1, 1, 0.84]
  )

  // ABOUT
  const aboutOpacity = useTransform(
    scrollProgress,
    [0.26, 0.36, 0.58, 0.70],
    [0, 1, 1, 0]
  )

  const aboutX = useTransform(
    scrollProgress,
    [0.26, 0.36, 0.58, 0.70],
    [90, 0, 0, -420]
  )

  const aboutScale = useTransform(
    scrollProgress,
    [0.32, 0.58, 0.70],
    [0.97, 1, 0.94]
  )

  const aboutBackgroundOpacity = useTransform(
    scrollProgress,
    [0.22, 0.34, 0.58, 0.72],
    [0, 1, 1, 0]
  )

  // SERVICES / HORIZONTAL SCROLL
  const casesOpacity = useTransform(
    scrollProgress,
    [0.58, 0.70, 0.98, 1],
    [0, 1, 1, 1]
  )

  const casesTitleX = useTransform(
    scrollProgress,
    [0.58, 0.70],
    [140, 0]
  )

  const casesX = useTransform(
    scrollProgress,
    [0.68, 0.98],
    ['8%', '-76%']
  )

  const casesBackgroundOpacity = useTransform(
    scrollProgress,
    [0.58, 0.70, 1],
    [0, 1, 1]
  )

  const scrollIndicatorOpacity = useTransform(
    scrollProgress,
    [0, 0.06, 0.16],
    [1, 0.7, 0]
  )

  function handleAware() {
    if (!checked) return
    setAware(true)
    window.setTimeout(() => {
      window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer')
    }, 600)
  }

  return (
    <>

      {/* MOBILE — layout normal, sem sticky/camadas sobrepostas.
        Isso evita que a foto cubra o texto e que a cena Motion fique
        comprimida em telas pequenas. */}
      <div
        className="block min-h-screen overflow-x-hidden bg-[#eaf7ed] text-[#111410] md:hidden"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-[#07150d] px-6 py-16 text-white">
          <img
            src={HERO_IMG}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#07150d]/75" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(6,24,13,.96) 0%, rgba(6,24,13,.78) 55%, rgba(6,24,13,.94) 100%)',
            }}
          />

          <div className="relative z-10 mx-auto w-full max-w-xl">
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#a8d5b5]">
              Psicologia Clínica · Terapia Cognitivo-Comportamental · Atendimento Online
            </p>

            <h1
              className="text-[clamp(2.7rem,12vw,4.2rem)] font-bold leading-[.98]"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Você não precisa
              <br />
              <span className="text-[#d4edda]">carregar esse peso</span>
              <br />
              sozinho.
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-relaxed text-[#d4edda]">
              Cuidar da sua saúde mental é o ato mais corajoso que você pode fazer.
              Juntos encontramos o caminho para uma vida mais leve e inteira.
            </p>

            <div className="mt-10 flex justify-center">
              <span className="text-[9px] uppercase tracking-[0.25em] text-white/55">
                Role para continuar
              </span>
            </div>
          </div>
        </section>

        <section className="bg-[#d4edda] px-6 py-16">
          <div className="mx-auto w-full max-w-xl">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3a7d52]">
              Conheça o profissional
            </p>

            <h2
              className="text-[clamp(2.7rem,12vw,4.3rem)] font-semibold italic leading-none text-[#111410]"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Sobre Mim
            </h2>

            {/* A imagem passa a ocupar seu próprio bloco no mobile.
              Assim ela nunca fica por cima do texto. */}
            <div className="mt-8 flex justify-center">
              <div className="aspect-[736/920] w-[min(72vw,320px)] overflow-hidden rounded-[26px] shadow-[0_25px_60px_rgba(0,0,0,.18)]">
                <img
                  src={WALACE_IMG}
                  alt="Walace, psicólogo clínico"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>

            <div className="mt-9 space-y-5 text-[15px] leading-[1.75] text-[#2a3528]">
              <p>
                Sou Psicólogo Clínico, atuo com manejo do comportamento e das emoções e na orientação parental, ajudando crianças e adolescentes neuroatípicas a conquistarem autonomia e maior repertório para expressividade das emoções.
              </p>
              <p>
                Realizo atendimentos com adultos, através da Terapia Cognitiva Comportamental (TCC), com foco em construir autonomia do paciente para o gerenciamento das emoções.
              </p>
              <p>
                Também atuo em consultório atendendo crianças e adolescentes atípicos através da ciência ABA.
              </p>
              <p>
                Pós graduado em Neuropsicologia com ênfase em avaliações. E pós graduando em Análise Aplicada do Comportamento (ABA).
              </p>
              <p>
                Tenho experiência em grupos terapêuticos, com crianças, adolescentes e idosos.
              </p>
              <p>
                Na aplicação, correção de testes e construção do laudo psicológico para a realização do psicodiagnóstico. E em apoio psicológico a comunidades vulneráveis.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {['TCC', 'Ansiedade', 'Depressão', 'TDAH', 'Autismo', 'Identidade', 'Medo', 'Angústia'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#a8d5b5] px-3.5 py-2 text-[11px] font-medium text-[#1e3d28]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-[#0d1b12] py-16 text-white">
          <div className="px-6">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6aab82]">
              Áreas de atuação
            </p>
            <h2
              className="text-[clamp(2.5rem,11vw,4rem)] font-semibold leading-none"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Como posso ajudar
            </h2>
          </div>

          <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SERVICES.map((service) => (
              <article
                key={service.number}
                className="flex h-[310px] w-[82vw] max-w-[330px] flex-shrink-0 snap-start flex-col justify-between rounded-[26px] border border-[#35553d] bg-[#17251a] p-7"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-[#6aab82]">{service.number}</span>
                  <span className="text-[9px] uppercase tracking-widest text-[#6aab82]">{service.short}</span>
                </div>

                <div>
                  <h3
                    className="text-[2rem] font-semibold leading-[1.05] text-white"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    {service.label}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#a8d5b5]">{service.desc}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#6aab82]">Terapia Cognitivo-Comportamental</span>
                  <span className="text-xl text-white">→</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="valor-mobile" className="bg-[#eaf7ed] px-6 py-16">
          <div className="mx-auto max-w-xl text-center">
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-[#3a7d52]">
              Investimento
            </p>

            <h2
              className="text-[clamp(1.9rem,8vw,2.6rem)] font-semibold leading-tight"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Consulta individual
              <br />
              <span className="text-[#2d6a46]">R$ 120 / sessão</span>
            </h2>

            <p className="mt-5 text-[0.95rem] leading-relaxed text-[#3a3f36]">
              Sessões de 50 minutos, agenda flexível e sigilo total. Atendimento psicológico individual, com sessões de 50 minutos.
            </p>

            <div className="mt-8 rounded-2xl border border-[#c5e8ce] bg-white p-6 text-left shadow-sm">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(event) => setChecked(event.target.checked)}
                  className="mt-1 h-5 w-5 flex-shrink-0 rounded"
                  style={{ accentColor: '#2d6a46' }}
                />
                <span className="text-sm leading-snug text-[#3a3f36]">
                  Estou ciente de que o valor da consulta é de <strong className="text-[#111410]">R$ 120</strong> por sessão e desejo prosseguir com o agendamento.
                </span>
              </label>

              <button
                onClick={handleAware}
                disabled={!checked}
                className="mt-6 w-full rounded-xl py-4 text-base font-medium tracking-wide transition-all duration-300"
                style={{
                  background: checked ? '#2d6a46' : '#c5e8ce',
                  color: checked ? '#fff' : '#6aab82',
                  cursor: checked ? 'pointer' : 'not-allowed',
                }}
              >
                {aware ? 'Redirecionando para o WhatsApp…' : 'Quero agendar minha consulta →'}
              </button>
            </div>
          </div>
        </section>

        <footer className="bg-[#111410] px-6 py-10 text-[#6aab82]">
          <div className="mx-auto flex max-w-xl flex-col items-center gap-5 text-center text-xs">
            <div>
              <span
                className="font-semibold text-[#d4edda]"
                style={{ fontFamily: "'Fraunces', serif", fontSize: '1rem' }}
              >
                Psicologo Walace
              </span>
              <span className="ml-2">· Psicólogo Clínico</span>
            </div>

            <div className="flex flex-wrap justify-center gap-5">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#d4edda]">
                WhatsApp
              </a>
              <a href="mailto:contato@drwalace.com.br" className="transition-colors hover:text-[#d4edda]">
                E-mail
              </a>
              <a href="#valor-mobile" className="transition-colors hover:text-[#d4edda]">
                Agendar
              </a>
            </div>

            <p>© 2026 Psicologo Walace · Todos os direitos reservados</p>
          </div>
        </footer>
      </div>

      <div
        className="hidden md:block relative min-h-screen bg-[#07150d] text-[#111410]"
        style={{ fontFamily: "'Outfit', sans-serif", overflowX: "clip" }}
      >
        <section ref={storyRef} className="relative h-[400vh] bg-[#07150d]">
          <div className="sticky top-0 z-10 h-screen overflow-hidden bg-[#07150d]" style={{ isolation: "isolate" }}>

            <motion.div
              style={{ opacity: heroOpacity }}
              className="absolute inset-0 z-0 overflow-hidden will-change-[opacity]"
            >
              <motion.img
                src={HERO_IMG}
                alt=""
                style={{ scale: heroScale }}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              <div className="absolute inset-0 bg-[#07150d]/70" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(6,24,13,.94) 0%, rgba(6,24,13,.72) 48%, rgba(6,24,13,.28) 100%)',
                }}
              />
            </motion.div>

            <motion.div
              style={{ opacity: aboutBackgroundOpacity }}
              className="absolute inset-0 z-10 bg-[#d4edda]"
            />

            <motion.div
              style={{ opacity: casesBackgroundOpacity }}
              className="absolute inset-0 z-20 bg-[#0d1b12]"
            />

            <motion.div
              style={{ opacity: heroOpacity }}
              className="absolute inset-0 z-30 flex items-center"
            >
              <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
                <div className="max-w-3xl">
                  <motion.p
                    style={{ y: eyebrowY, opacity: eyebrowOpacity }}
                    className="mb-6 uppercase tracking-[0.18em] text-[10px] font-medium text-[#a8d5b5] md:text-xs"
                  >
                    Psicologia Clínica · Terapia Cognitivo-Comportamental · Atendimento Online
                  </motion.p>

                  <motion.h1
                    style={{
                      y: headlineY,
                      scale: headlineScale,
                      opacity: headlineOpacity,
                      transformOrigin: 'left center',
                      fontFamily: "'Fraunces', serif",
                    }}
                    className="max-w-[760px] text-[clamp(2.8rem,7vw,5.8rem)] font-bold leading-[.98] text-white"
                  >
                    Você não precisa
                    <br />
                    <span className="text-[#d4edda]">carregar esse peso</span>
                    <br />
                    sozinho.
                  </motion.h1>

                  <motion.p
                    style={{ y: heroTextY, opacity: heroTextOpacity }}
                    className="mt-7 max-w-xl text-sm leading-relaxed text-[#d4edda] md:text-base"
                  >
                    Cuidar da sua saúde mental é o ato mais corajoso que você pode fazer.
                    Juntos encontramos o caminho para uma vida mais leve e inteira.
                  </motion.p>
                </div>
              </div>
            </motion.div>

            <motion.div
              style={{
                x: doctorX,
                y: doctorY,
                scale: doctorScale,
                opacity: doctorOpacity,
              }}
              className="absolute right-[2vw] top-1/2 z-50 aspect-[736/920] w-[180px] -translate-y-1/2 overflow-hidden rounded-[30px] bg-[#111410] p-2 shadow-[0_35px_90px_rgba(0,0,0,.32)] will-change-transform md:right-[4vw] md:w-[240px] lg:right-[5vw] lg:w-[315px]"
            >
              <img
                src={WALACE_IMG}
                alt="Psicologo Walace, psicólogo clínico"
                className="h-full w-full rounded-[23px] object-cover object-top"
              />
              <div className="pointer-events-none absolute inset-2 rounded-[23px] border border-white/15" />
            </motion.div>

            <motion.div
              style={{ x: aboutX, opacity: aboutOpacity, scale: aboutScale }}
              className="absolute inset-0 z-40 flex items-center will-change-transform"
            >
              <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
                <div className="max-w-[1150px] mx-auto">
                  <div className="max-w-[620px] md:max-w-[650px]">
                    <p className="mb-4 uppercase tracking-[0.18em] text-[10px] font-semibold text-[#3a7d52]">
                      Conheça o profissional
                    </p>

                    <h2
                      className="text-[clamp(2.5rem,5vw,4.6rem)] font-semibold italic leading-none text-[#111410]"
                      style={{ fontFamily: "'Fraunces', serif" }}
                    >
                      Sobre Mim
                    </h2>

                    <div className="mt-7 max-w-xl space-y-4 text-sm leading-relaxed text-[#2a3528] md:text-base">
                      <p>
                        Sou Psicólogo Clínico, atuo com manejo do comportamento e das emoções e na orientação parental, ajudando crianças e adolescentes neuroatípicas a conquistarem autonomia e maior repertório para expressividade das emoções.
                      </p>
                      <p>
                        Realizo atendimentos com adultos, através da Terapia Cognitiva Comportamental (TCC), com foco em construir autonomia do paciente para o gerenciamento das emoções.
                      </p>
                      <p>
                        Também atuo em consultório atendendo crianças e adolescentes atípicos através da ciência ABA.
                      </p>
                      <p>
                        Pós graduado em Neuropsicologia com ênfase em avaliações. E pós graduando em Análise Aplicada do Comportamento (ABA).
                      </p>
                      <p>
                        Tenho experiência em grupos terapêuticos, com crianças, adolescentes e idosos.
                      </p>
                      <p>
                        Na aplicação, correção de testes e construção do laudo psicológico para a realização do psicodiagnóstico. E em apoio psicológico a comunidades vulneráveis.
                      </p>
                    </div>

                    <div className="mt-7 flex max-w-xl flex-wrap gap-2">
                      {['TCC', 'Ansiedade', 'Depressão', 'TDAH', 'Autismo', 'Identidade', 'Medo', 'Angústia'].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#a8d5b5] px-3 py-1.5 text-[11px] font-medium text-[#1e3d28]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              style={{ opacity: casesOpacity }}
              className="absolute inset-0 z-[60] flex items-center overflow-hidden"
            >
              <div className="w-full">
                <motion.div
                  style={{ x: casesTitleX }}
                  className="mx-auto mb-10 max-w-6xl px-6 md:px-10"
                >
                  <p className="mb-3 uppercase tracking-[0.18em] text-[10px] font-semibold text-[#6aab82] md:text-xs">
                    Áreas de atuação
                  </p>
                  <h2
                    className="text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-none text-white"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    Como posso ajudar
                  </h2>
                </motion.div>

                <motion.div
                  style={{ x: casesX }}
                  className="flex w-max gap-5 pl-[8vw]"
                >
                  {SERVICES.map((service) => (
                    <motion.article
                      key={service.number}
                      whileHover={{ y: -8, scale: 1.015 }}
                      transition={{ duration: 0.25 }}
                      className="flex h-[300px] w-[275px] flex-shrink-0 flex-col justify-between rounded-[28px] border border-[#35553d] bg-[#17251a] p-7 md:h-[350px] md:w-[340px] md:p-9"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[#6aab82]">{service.number}</span>
                        <span className="text-[10px] uppercase tracking-widest text-[#6aab82]">{service.short}</span>
                      </div>

                      <div>
                        <h3
                          className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold leading-[1.05] text-white"
                          style={{ fontFamily: "'Fraunces', serif" }}
                        >
                          {service.label}
                        </h3>
                        <p className="mt-4 text-sm leading-relaxed text-[#a8d5b5]">{service.desc}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#6aab82]">Terapia Cognitivo-Comportamental</span>
                        <span className="text-xl text-white">→</span>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              style={{ opacity: scrollIndicatorOpacity }}
              className="absolute bottom-8 left-1/2 z-[70] flex -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-white/60"
            >
              <span>Scroll</span>
              <div className="h-10 w-px overflow-hidden bg-white/30">
                <motion.div
                  animate={{ y: [0, 40] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="h-1/2 w-full bg-white"
                />
              </div>
            </motion.div>
          </div>
        </section >

        <section id="valor" className="min-h-screen bg-[#eaf7ed] px-6 py-24" style={{ backgroundColor: '#eaf7ed' }}>
          <div className="mx-auto max-w-xl text-center">
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-[#3a7d52]">Investimento</p>

            <h2
              className="text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-tight"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Consulta individual
              <br />
              <span className="text-[#2d6a46]">R$ 120 / sessão</span>
            </h2>

            <p className="mt-5 text-[0.97rem] leading-relaxed text-[#3a3f36]">
              Sessões de 50 minutos, agenda flexível e sigilo total. Atendimento psicológico individual, com sessões de 50 minutos.
            </p>

            <div className="mt-10 rounded-2xl border border-[#c5e8ce] bg-white p-8 shadow-sm">
              <label className="flex cursor-pointer items-start gap-3 text-left">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(event) => setChecked(event.target.checked)}
                  className="mt-1 h-5 w-5 flex-shrink-0 rounded"
                  style={{ accentColor: '#2d6a46' }}
                />
                <span className="text-sm leading-snug text-[#3a3f36]">
                  Estou ciente de que o valor da consulta é de <strong className="text-[#111410]">R$ 120</strong> por sessão e desejo prosseguir com o agendamento.
                </span>
              </label>

              <button
                onClick={handleAware}
                disabled={!checked}
                className="mt-6 w-full rounded-xl py-4 text-base font-medium tracking-wide transition-all duration-300"
                style={{
                  background: checked ? '#2d6a46' : '#c5e8ce',
                  color: checked ? '#fff' : '#6aab82',
                  cursor: checked ? 'pointer' : 'not-allowed',
                }}
              >
                {aware ? 'Redirecionando para o WhatsApp…' : 'Quero agendar minha consulta →'}
              </button>
            </div>
          </div>
        </section>

        <footer className="bg-[#111410] px-6 py-10 text-[#6aab82]">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-xs md:flex-row">
            <div>
              <span
                className="font-semibold text-[#d4edda]"
                style={{ fontFamily: "'Fraunces', serif", fontSize: '1rem' }}
              >
                Psicologo Walace
              </span>
              <span className="ml-2">· Psicólogo Clínico</span>
            </div>

            <div className="flex gap-6">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#d4edda]">WhatsApp</a>
              <a href="mailto:contato@drwalace.com.br" className="transition-colors hover:text-[#d4edda]">E-mail</a>
              <a href="#valor" className="transition-colors hover:text-[#d4edda]">Agendar</a>
            </div>

            <p>© 2026 Psicologo Walace · Todos os direitos reservados</p>
          </div>
        </footer>
      </div>
    </>
  )
}
