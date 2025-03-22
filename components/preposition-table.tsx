"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

// Russian preposition data
const prepositionData = [
  {
    preposition: "без",
    cases: "Genitive",
    meaning: '"without"',
    examples: "Я пью чай без сахара (I drink tea without sugar).",
    notes: "Always Genitive.",
  },
  {
    preposition: "благодаря",
    cases: "Dative",
    meaning: '"thanks to"',
    examples: "Благодаря друзьям (Thanks to friends).",
    notes: "Often used with positive outcomes.",
  },
  {
    preposition: "в / во",
    cases: "Accusative",
    meaning: '"into, to" (movement into a place)',
    examples: "Он идёт в школу (He's going to school).",
    notes: "Use во before consonant clusters (e.g., во дворе).",
  },
  {
    preposition: "в / во",
    cases: "Prepositional",
    meaning: '"in, at" (location/time)',
    examples: "Они в парке (They're in the park). В среду (On Wednesday).",
    notes: "Time expressions use Prepositional.",
  },
  {
    preposition: "вблизи",
    cases: "Genitive",
    meaning: '"near, close to"',
    examples: "Вблизи дома (Near the house).",
    notes: "Synonym of около.",
  },
  {
    preposition: "ввиду",
    cases: "Genitive",
    meaning: '"in view of, due to" (formal)',
    examples: "Ввиду обстоятельств (Due to circumstances).",
    notes: "Common in formal writing.",
  },
  {
    preposition: "вдоль",
    cases: "Genitive",
    meaning: '"along"',
    examples: "Идти вдоль реки (Walk along the river).",
    notes: "Directional.",
  },
  {
    preposition: "вместо",
    cases: "Genitive",
    meaning: '"instead of"',
    examples: "Вместо кофе (Instead of coffee).",
    notes: "Always Genitive.",
  },
  {
    preposition: "вне",
    cases: "Genitive",
    meaning: '"outside of"',
    examples: "Вне закона (Outside the law).",
    notes: "Abstract or metaphorical use.",
  },
  {
    preposition: "внутри",
    cases: "Genitive",
    meaning: '"inside" (static)',
    examples: "Внутри коробки (Inside the box).",
    notes: "No movement.",
  },
  {
    preposition: "внутрь",
    cases: "Genitive",
    meaning: '"into" (movement)',
    examples: "Они вошли внутрь здания (They entered the building).",
    notes: "Directional.",
  },
  {
    preposition: "возле",
    cases: "Genitive",
    meaning: '"near, by"',
    examples: "Возле окна (By the window).",
    notes: "Similar to около.",
  },
  {
    preposition: "вокруг",
    cases: "Genitive",
    meaning: '"around"',
    examples: "Вокруг стола (Around the table).",
    notes: "Static or directional.",
  },
  {
    preposition: "вопреки",
    cases: "Dative",
    meaning: '"despite"',
    examples: "Вопреки совету (Despite the advice).",
    notes: "Often used with challenges.",
  },
  {
    preposition: "впереди",
    cases: "Genitive",
    meaning: '"in front of"',
    examples: "Впереди магазина (In front of the store).",
    notes: "Static position.",
  },
  {
    preposition: "вроде",
    cases: "Genitive",
    meaning: '"like, similar to"',
    examples: "Вроде тебя (Like you).",
    notes: "Colloquial.",
  },
  {
    preposition: "вследствие",
    cases: "Genitive",
    meaning: '"as a result of" (formal)',
    examples: "Вследствие аварии (As a result of the accident).",
    notes: "Formal synonym of из-за.",
  },
  {
    preposition: "для",
    cases: "Genitive",
    meaning: '"for"',
    examples: "Подарок для мамы (A gift for mom).",
    notes: "Purpose or beneficiary.",
  },
  {
    preposition: "до",
    cases: "Genitive",
    meaning: '"until, before"',
    examples: "До вечера (Until evening). До войны (Before the war).",
    notes: "Temporal or spatial limit.",
  },
  {
    preposition: "за",
    cases: "Accusative",
    meaning: '"behind" (movement) / "for" (duration)',
    examples: "Он пошёл за дом (He went behind the house). За час (In an hour).",
    notes: 'With time, means "in" (duration).',
  },
  {
    preposition: "за",
    cases: "Instrumental",
    meaning: '"behind" (static) / "during"',
    examples: "Книга за столом (The book is behind the table). За обедом (During dinner).",
    notes: "Static location or activity.",
  },
  {
    preposition: "из",
    cases: "Genitive",
    meaning: '"from" (origin)',
    examples: "Он из Москвы (He's from Moscow).",
    notes: "Source or material (из дерева = made of wood).",
  },
  {
    preposition: "из-за",
    cases: "Genitive",
    meaning: '"from behind" / "because of"',
    examples: "Из-за угла (From around the corner). Из-за дождя (Because of rain).",
    notes: "Common for reasons.",
  },
  {
    preposition: "из-под",
    cases: "Genitive",
    meaning: '"from under"',
    examples: "Кот вылез из-под кровати (The cat crawled out from under the bed).",
    notes: "Literal or metaphorical.",
  },
  {
    preposition: "к / ко",
    cases: "Dative",
    meaning: '"to, toward" (direction/purpose)',
    examples: "Идти к другу (Go to a friend). К счастью (Fortunately).",
    notes: "Use ко before clusters (e.g., ко мне).",
  },
  {
    preposition: "кроме",
    cases: "Genitive",
    meaning: '"except, besides"',
    examples: "Все, кроме него (Everyone except him).",
    notes: "Exclusion.",
  },
  {
    preposition: "между",
    cases: "Genitive",
    meaning: '"between" (rare, fixed phrases)',
    examples: "Между двух огней (Between two fires).",
    notes: "Mostly uses Instrumental (see below).",
  },
  {
    preposition: "между",
    cases: "Instrumental",
    meaning: '"between" (common usage)',
    examples: "Между нами (Between us).",
    notes: 'Standard case for spatial or abstract "between".',
  },
  {
    preposition: "мимо",
    cases: "Genitive",
    meaning: '"past"',
    examples: "Пройти мимо магазина (Walk past the store).",
    notes: "Directional.",
  },
  {
    preposition: "на",
    cases: "Accusative",
    meaning: '"onto" (movement)',
    examples: "Положить на стол (Put on the table). На неделю (For a week).",
    notes: "With time, на + Accusative = duration.",
  },
  {
    preposition: "на",
    cases: "Prepositional",
    meaning: '"on, at" (location)',
    examples: "Книга на столе (The book is on the table). На работе (At work).",
    notes: "Common for events (на концерте).",
  },
  {
    preposition: "над / надо",
    cases: "Instrumental",
    meaning: '"above, over"',
    examples: "Самолёт над городом (A plane above the city).",
    notes: "Use надо before certain clusters (надо мной).",
  },
  {
    preposition: "напротив",
    cases: "Genitive",
    meaning: '"opposite"',
    examples: "Напротив парка (Opposite the park).",
    notes: "Static position.",
  },
  {
    preposition: "насчёт",
    cases: "Genitive",
    meaning: '"about, regarding"',
    examples: "Поговорить насчёт работы (Talk about work).",
    notes: "Colloquial synonym of о.",
  },
  {
    preposition: "о / об / обо",
    cases: "Prepositional",
    meaning: '"about"',
    examples: "Мечтать о море (Dream about the sea).",
    notes: "Use об before vowels (об этом), обо before certain consonants (обо мне).",
  },
  {
    preposition: "о / об / обо",
    cases: "Accusative",
    meaning: '"against" (physical contact)',
    examples: "Удариться о стол (Bump into the table).",
    notes: "Rare; mostly physical contact.",
  },
  {
    preposition: "около",
    cases: "Genitive",
    meaning: '"near, around" (approx. time/quantity)',
    examples: "Около часа (About an hour). Около дома (Near the house).",
    notes: "Colloquial for approximations.",
  },
  {
    preposition: "от / ото",
    cases: "Genitive",
    meaning: '"from" (source/separation)',
    examples: "Письмо от друга (A letter from a friend). Отойти от окна (Step away from the window).",
    notes: "Use ото before clusters (ото всех).",
  },
  {
    preposition: "перед / передо",
    cases: "Instrumental",
    meaning: '"in front of, before"',
    examples: "Перед зданием (In front of the building). Перед сном (Before sleep).",
    notes: "Use передо before clusters (передо мной).",
  },
  {
    preposition: "по",
    cases: "Dative",
    meaning: '"on, along, by" (transport) / "per"',
    examples: "Ехать по дороге (Drive along the road). По два яблока (Two apples each).",
    notes: "Also for days (по понедельникам = on Mondays).",
  },
  {
    preposition: "по",
    cases: "Accusative",
    meaning: '"up to" (limited usage)',
    examples: "По пояс (Up to the waist).",
    notes: "Rare; mostly in fixed phrases.",
  },
  {
    preposition: "под / подо",
    cases: "Accusative",
    meaning: '"under" (movement)',
    examples: "Спрятать под кровать (Hide under the bed).",
    notes: "Use подо before clusters (подо мной).",
  },
  {
    preposition: "под / подо",
    cases: "Instrumental",
    meaning: '"under" (static)',
    examples: "Кот под столом (The cat is under the table).",
    notes: "Static position.",
  },
  {
    preposition: "ради",
    cases: "Genitive",
    meaning: '"for the sake of"',
    examples: "Ради детей (For the kids' sake).",
    notes: "Purpose or motivation.",
  },
  {
    preposition: "с / со",
    cases: "Genitive",
    meaning: '"from" (origin)',
    examples: "Спуститься с горы (Come down from the mountain).",
    notes: "Use со before clusters (со стола).",
  },
  {
    preposition: "с / со",
    cases: "Instrumental",
    meaning: '"with" (companion/tool)',
    examples: "Чай с сахаром (Tea with sugar). Писать с ручкой (Write with a pen).",
    notes: "Also for time: с утра (since morning).",
  },
  {
    preposition: "с / со",
    cases: "Accusative",
    meaning: '"about, approximately" (quantity)',
    examples: "С километр (About a kilometer).",
    notes: "Colloquial approximation.",
  },
  {
    preposition: "сквозь",
    cases: "Accusative",
    meaning: '"through" (physical)',
    examples: "Смотреть сквозь окно (Look through the window).",
    notes: "Literal penetration.",
  },
  {
    preposition: "согласно",
    cases: "Dative",
    meaning: '"according to"',
    examples: "Согласно правилам (According to the rules).",
    notes: "Formal context.",
  },
  {
    preposition: "среди",
    cases: "Genitive",
    meaning: '"among"',
    examples: "Среди друзей (Among friends).",
    notes: "Abstract or physical grouping.",
  },
  {
    preposition: "у",
    cases: "Genitive",
    meaning: '"at, by, near" / possession',
    examples: "У реки (By the river). У меня есть... (I have...).",
    notes: "Possession requires у + Genitive + есть.",
  },
  {
    preposition: "через",
    cases: "Accusative",
    meaning: '"through, across" / "in (time)"',
    examples: "Идти через лес (Walk through the forest). Через час (In an hour).",
    notes: 'Time = "after a period".',
  },
]

export default function PrepositionTable() {
  const [showExamples, setShowExamples] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [caseFilter, setCaseFilter] = useState<string>("")
  const [hiddenCases, setHiddenCases] = useState<Record<string, boolean>>({})
  const [hiddenMeanings, setHiddenMeanings] = useState<Record<string, boolean>>({})
  const [testMode, setTestMode] = useState(false)

  // Filter prepositions based on search term and case filter
  const filteredPrepositions = prepositionData.filter((prep) => {
    const matchesSearch =
      prep.preposition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prep.meaning.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCase = caseFilter === "" || prep.cases.toLowerCase().includes(caseFilter.toLowerCase())

    return matchesSearch && matchesCase
  })

  // Get unique cases for the filter dropdown
  const uniqueCases = Array.from(new Set(prepositionData.map((prep) => prep.cases)))

  // Toggle case visibility for a specific preposition
  const toggleCaseVisibility = (prepId: string) => {
    setHiddenCases((prev) => {
      if (prev[prepId]) {
        const newState = { ...prev }
        delete newState[prepId]
        return newState
      } else {
        return {
          ...prev,
          [prepId]: true,
        }
      }
    })
  }

  // Toggle meaning visibility for a specific preposition
  const toggleMeaningVisibility = (prepId: string) => {
    setHiddenMeanings((prev) => {
      if (prev[prepId]) {
        const newState = { ...prev }
        delete newState[prepId]
        return newState
      } else {
        return {
          ...prev,
          [prepId]: true,
        }
      }
    })
  }

  // Enable or disable test mode
  const toggleTestMode = (enabled: boolean) => {
    setTestMode(enabled)
    if (enabled) {
      // Hide all preposition information
      const allHidden: Record<string, boolean> = {}
      filteredPrepositions.forEach((prep, index) => {
        const prepId = `${prep.preposition}-${prep.cases}-${index}`
        allHidden[prepId] = true
      })
      setHiddenCases(allHidden)
      setHiddenMeanings(allHidden)
    } else {
      // Show all preposition information
      setHiddenCases({})
      setHiddenMeanings({})
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1">
          <Input
            placeholder="Search prepositions or meanings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex items-center gap-4">
          <select
            className="border rounded p-2 bg-background"
            value={caseFilter}
            onChange={(e) => setCaseFilter(e.target.value)}
          >
            <option value="">All Cases</option>
            {uniqueCases.map((caseType) => (
              <option key={caseType} value={caseType}>
                {caseType}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Switch id="prep-examples" checked={showExamples} onCheckedChange={setShowExamples} />
          <Label htmlFor="prep-examples">Show Examples</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="prep-test-mode" checked={testMode} onCheckedChange={toggleTestMode} />
          <Label htmlFor="prep-test-mode">Hide Info (Test Mode)</Label>
        </div>

        {(Object.keys(hiddenCases).length > 0 || Object.keys(hiddenMeanings).length > 0) && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setHiddenCases({})
              setHiddenMeanings({})
            }}
            className="ml-auto"
          >
            <Eye className="mr-2 h-4 w-4" /> Reveal All
          </Button>
        )}
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px] sticky left-0 bg-background z-10">Preposition</TableHead>
              <TableHead className="w-[120px]">Case(s)</TableHead>
              <TableHead className="w-[200px]">Meaning/Usage</TableHead>
              {showExamples && <TableHead className="w-[250px]">Example(s)</TableHead>}
              {showExamples && <TableHead className="w-[200px]">Notes/Exceptions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPrepositions.map((prep, index) => {
              const prepId = `${prep.preposition}-${prep.cases}-${index}`
              const isCaseHidden = hiddenCases[prepId]
              const isMeaningHidden = hiddenMeanings[prepId]

              return (
                <TableRow key={prepId}>
                  <TableCell className="font-medium sticky left-0 bg-background z-10">{prep.preposition}</TableCell>
                  <TableCell
                    onClick={() => testMode && toggleCaseVisibility(prepId)}
                    className={testMode ? "cursor-pointer" : ""}
                  >
                    {isCaseHidden ? (
                      <Button variant="ghost" size="sm" className="h-6 text-xs">
                        <Eye size={14} className="mr-1" /> Show
                      </Button>
                    ) : (
                      prep.cases
                    )}
                  </TableCell>
                  <TableCell
                    onClick={() => testMode && toggleMeaningVisibility(prepId)}
                    className={testMode ? "cursor-pointer" : ""}
                  >
                    {isMeaningHidden ? (
                      <Button variant="ghost" size="sm" className="h-6 text-xs">
                        <Eye size={14} className="mr-1" /> Show
                      </Button>
                    ) : (
                      <span dangerouslySetInnerHTML={{ __html: prep.meaning }}></span>
                    )}
                  </TableCell>
                  {showExamples && <TableCell dangerouslySetInnerHTML={{ __html: prep.examples }}></TableCell>}
                  {showExamples && <TableCell dangerouslySetInnerHTML={{ __html: prep.notes }}></TableCell>}
                </TableRow>
              )
            })}
            {filteredPrepositions.length === 0 && (
              <TableRow>
                <TableCell colSpan={showExamples ? 5 : 3} className="text-center py-4">
                  No prepositions found matching your search criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

