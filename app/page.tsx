"use client";

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, AlertTriangle, Users, ArrowRight, FileText } from "lucide-react"
import { useState, useRef } from "react"

export default function Home() {

  const [showGenerator, setShowGenerator] = useState(false)
  const [input, setInput] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const generatorRef = useRef<HTMLDivElement | null>(null);
  
  const handleGenerate = async () => {
    setLoading(true)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input })
    })
    const data = await res.json()
    setResult(data)
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-violet-600" />
              <span className="inline-block font-bold">StorIA</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <Link
                href="#como-funciona"
                className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
              >
                Cómo funciona
              </Link>
              <Link
                href="#testimonios"
                className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block ml-4"
              >
                Testimonios
              </Link>
              <Link
                href="#"
                className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block ml-4"
              >
                FAQ
              </Link>
              <Button variant="default" size="sm" className="ml-4 bg-violet-600 hover:bg-violet-700">
                Iniciar sesión
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Convierte ideas vagas en historias listas para desarrollo — en segundos.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    StorIA es tu copiloto de IA que transforma ideas en lenguaje natural en historias estructuradas, con
                    criterios sugeridos y alertas de calidad.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  onClick={() => {
                    setShowGenerator(true);
                    setTimeout(() => {
                      generatorRef.current?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 text-base"
                >
                  Genera tu primera historia con IA — Gratis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px] rounded-lg border bg-background p-4 shadow-lg">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-md bg-muted p-3">
                      <p className="text-sm text-muted-foreground">
                        Como usuario, quiero poder filtrar productos por categoría para encontrar más rápido lo que
                        busco.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-violet-600" />
                        <p className="font-medium">Historia estructurada:</p>
                      </div>
                      <div className="rounded-md bg-violet-50 p-3">
                        <p className="font-medium">Como</p>
                        <p>usuario de la tienda online</p>
                        <p className="font-medium">Quiero</p>
                        <p>poder filtrar productos por categoría</p>
                        <p className="font-medium">Para</p>
                        <p>encontrar más rápido lo que estoy buscando</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-violet-600" />
                        <p className="font-medium">Criterios de aceptación:</p>
                      </div>
                      <div className="rounded-md bg-violet-50 p-3 space-y-2">
                        <div>
                          <p className="font-medium">Given</p>
                          <p>que soy un usuario en la página de productos</p>
                        </div>
                        <div>
                          <p className="font-medium">When</p>
                          <p>selecciono una categoría del filtro lateral</p>
                        </div>
                        <div>
                          <p className="font-medium">Then</p>
                          <p>solo se muestran los productos de esa categoría</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {showGenerator && (
         <section ref={generatorRef} className="w-full py-12 bg-background border-t">
          <div className="container max-w-2xl mx-auto space-y-4 px-4">
            <h2 className="text-2xl font-bold">Escribe tu idea</h2>
            <textarea
              className="w-full border rounded p-3 text-sm"
              rows={4}
              placeholder="Ej: Quiero que los usuarios puedan editar su dirección..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-violet-600 hover:bg-violet-700 text-white"
            >
              {loading ? "Generando..." : "Generar historia"}
            </Button>

            {result && (
              <div className="space-y-6 mt-8">
                <div>
                  <h3 className="font-semibold">📝 Historia:</h3>
                  <p>{result.story}</p>
                </div>
                <div>
                  <h3 className="font-semibold">✅ Criterios:</h3>
                  <ul className="list-disc pl-6">
                    {result.criteria.map((c: string, i: number) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">💬 Feedback:</h3>
                  <p>{result.feedback}</p>
                </div>
                <div>
                  <h3 className="font-semibold">🆕 Historia mejorada:</h3>
                  <p>{result.story_improved}</p>
                </div>
                <div>
                  <h3 className="font-semibold">🔁 Criterios mejorados:</h3>
                  <ul className="list-disc pl-6">
                    {result.criteria_improved.map((c: string, i: number) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

        {/* Problem Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
                El problema que resolvemos
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 mb-6">
                Claudia, Product Owner, escribió historias sin tiempo suficiente. En la reunión, nadie entendía los
                criterios. Resultado: bugs, retrabajo, caos.
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:max-w-5xl">
              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                  <Clock className="h-6 w-6" />
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="font-bold">Falta de tiempo</h3>
                  <p className="text-muted-foreground">
                    Escribir historias de usuario detalladas consume horas que podrías dedicar a estrategia.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="font-bold">Criterios vagos</h3>
                  <p className="text-muted-foreground">
                    Sin criterios claros, los desarrolladores interpretan requisitos de formas diferentes.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                  <Users className="h-6 w-6" />
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="font-bold">Equipo confundido</h3>
                  <p className="text-muted-foreground">
                    Las reuniones se alargan con debates sobre lo que realmente significa cada historia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Beneficios que obtendrás</h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                StorIA transforma tu proceso de creación de historias de usuario
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:max-w-5xl mt-8">
              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✍️</span>
                  <h3 className="font-bold">5 veces más rápido</h3>
                </div>
                <p className="mt-2 text-muted-foreground">
                  Genera historias completas al instante, ahorrando horas de trabajo manual.
                </p>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🧠</span>
                  <h3 className="font-bold">Criterios automáticos</h3>
                </div>
                <p className="mt-2 text-muted-foreground">
                  Criterios Given/When/Then sugeridos automáticamente por la IA.
                </p>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🚨</span>
                  <h3 className="font-bold">Alertas de claridad</h3>
                </div>
                <p className="mt-2 text-muted-foreground">
                  Recibe alertas si algo está poco claro o podría generar confusión.
                </p>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🤝</span>
                  <h3 className="font-bold">Alineación de equipo</h3>
                </div>
                <p className="mt-2 text-muted-foreground">Mejora la comunicación entre diseño, desarrollo y negocio.</p>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🔁</span>
                  <h3 className="font-bold">Aprendizaje continuo</h3>
                </div>
                <p className="mt-2 text-muted-foreground">La IA aprende de tu estilo con cada historia que generas.</p>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-6 flex items-center justify-center">
                <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                  Probar ahora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="como-funciona" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Cómo funciona</h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Tres simples pasos para transformar tus ideas en historias estructuradas
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-3 lg:max-w-5xl mt-12">
              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-white font-bold">
                  1
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="font-bold">Describe tu idea</h3>
                  <p className="text-muted-foreground">
                    Escribe en lenguaje natural lo que necesitas, como lo harías en una conversación.
                  </p>
                  <div className="rounded-md bg-muted p-3 mt-4">
                    <p className="text-sm italic">
                      "Necesito que los usuarios puedan filtrar productos por categoría para encontrar más rápido lo que
                      buscan"
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-white font-bold">
                  2
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="font-bold">StorIA genera la historia</h3>
                  <p className="text-muted-foreground">
                    La IA estructura tu idea en formato de historia con criterios de aceptación.
                  </p>
                  <div className="rounded-md bg-violet-50 p-3 mt-4">
                    <p className="text-sm font-medium">Como usuario de la tienda online...</p>
                    <p className="text-sm italic text-muted-foreground">+ criterios de aceptación</p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-white font-bold">
                  3
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="font-bold">Revisa y exporta</h3>
                  <p className="text-muted-foreground">
                    Ajusta lo que necesites y exporta la historia directamente a tu backlog.
                  </p>
                  <div className="flex gap-2 mt-4">
                    <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
                      <Image src="/placeholder.svg?height=24&width=24" width={24} height={24} alt="Jira" />
                    </div>
                    <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
                      <Image src="/placeholder.svg?height=24&width=24" width={24} height={24} alt="Asana" />
                    </div>
                    <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
                      <Image src="/placeholder.svg?height=24&width=24" width={24} height={24} alt="Trello" />
                    </div>
                    <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
                      <Image src="/placeholder.svg?height=24&width=24" width={24} height={24} alt="Linear" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonios" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
                Lo que dicen nuestros usuarios
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Product Owners y Product Managers que ya están transformando su forma de trabajar
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:max-w-5xl mt-12">
              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-muted h-12 w-12 flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      width={48}
                      height={48}
                      alt="Lucía"
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">Lucía Martínez</h3>
                    <p className="text-sm text-muted-foreground">Product Owner en Fintech</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="italic">
                    "Usé StorIA antes de una daily. Evitamos 40 minutos de debate. La historia estaba lista y todos
                    entendieron los criterios a la primera."
                  </p>
                </div>
                <div className="mt-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="#8b5cf6"
                      stroke="#8b5cf6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-star"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-muted h-12 w-12 flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      width={48}
                      height={48}
                      alt="Andrés"
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">Andrés Gómez</h3>
                    <p className="text-sm text-muted-foreground">Product Manager en E-commerce</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="italic">
                    "Es como tener una UX writer con superpoderes. Las historias son claras, los criterios son precisos
                    y el equipo de desarrollo está mucho más alineado."
                  </p>
                </div>
                <div className="mt-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="#8b5cf6"
                      stroke="#8b5cf6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-star"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-violet-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Únete a los primeros equipos que ya están transformando cómo refinan historias.
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                  Optimiza tu proceso de creación de historias de usuario y mejora la comunicación en tu equipo.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 text-base">
                  Quiero probar StorIA
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">Demo gratuita por tiempo limitado.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-violet-600" />
          <p className="text-sm font-medium">StorIA</p>
        </div>
        <p className="text-xs text-muted-foreground sm:ml-4">
          &copy; {new Date().getFullYear()} StorIA. Todos los derechos reservados.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            FAQ
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Roadmap
          </Link>
          <Link href="mailto:hola@storia.ai" className="text-xs hover:underline underline-offset-4">
            Contacto (hola@storia.ai)
          </Link>
        </nav>
      </footer>
    </div>
  )
}
