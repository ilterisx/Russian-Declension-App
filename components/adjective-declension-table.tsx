"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Russian adjective declension data
const adjectiveDeclensions = {
  singular: {
    masculine: {
      nominative: "-ый, -ий, -ой",
      genitive: "-ого, -его",
      dative: "-ому, -ему",
      accusative: {
        inanimate: "-ый, -ий, -ой",
        animate: "-ого, -его",
      },
      instrumental: "-ым, -им",
      prepositional: "-ом, -ем",
    },
    feminine: {
      nominative: "-ая, -яя",
      genitive: "-ой, -ей",
      dative: "-ой, -ей",
      accusative: "-ую, -юю",
      instrumental: "-ой, -ей",
      prepositional: "-ой, -ей",
    },
    neuter: {
      nominative: "-ое, -ее",
      genitive: "-ого, -его",
      dative: "-ому, -ему",
      accusative: "-ое, -ее",
      instrumental: "-ым, -им",
      prepositional: "-ом, -ем",
    },
  },
  plural: {
    all: {
      nominative: "-ые, -ие",
      genitive: "-ых, -их",
      dative: "-ым, -им",
      accusative: {
        inanimate: "-ые, -ие",
        animate: "-ых, -их",
      },
      instrumental: "-ыми, -ими",
      prepositional: "-ых, -их",
    },
  },
}

// Example words for each gender
const examples = {
  singular: {
    masculine: {
      nominative: "новый, синий, большой",
      genitive: "нового, синего",
      dative: "новому, синему",
      accusative: {
        inanimate: "новый, синий (стол)",
        animate: "нового, синего (человека)",
      },
      instrumental: "новым, синим",
      prepositional: "новом, синем",
    },
    feminine: {
      nominative: "новая, синяя",
      genitive: "новой, синей",
      dative: "новой, синей",
      accusative: "новую, синюю",
      instrumental: "новой, синей",
      prepositional: "новой, синей",
    },
    neuter: {
      nominative: "новое, синее",
      genitive: "нового, синего",
      dative: "новому, синему",
      accusative: "новое, синее",
      instrumental: "новым, синим",
      prepositional: "новом, синем",
    },
  },
  plural: {
    all: {
      nominative: "новые, синие",
      genitive: "новых, синих",
      dative: "новым, синим",
      accusative: {
        inanimate: "новые, синие (столы)",
        animate: "новых, синих (людей)",
      },
      instrumental: "новыми, синими",
      prepositional: "новых, синих",
    },
  },
}

export default function AdjectiveDeclensionTable() {
  const [selectedGender, setSelectedGender] = useState<"masculine" | "feminine" | "neuter">("masculine")
  const [showExamples, setShowExamples] = useState(true)
  const [hiddenEndings, setHiddenEndings] = useState<Record<string, boolean>>({})

  const cases = ["nominative", "genitive", "dative", "accusative", "instrumental", "prepositional"]
  const caseTranslations = {
    nominative: "Именительный",
    genitive: "Родительный",
    dative: "Дательный",
    accusative: "Винительный",
    instrumental: "Творительный",
    prepositional: "Предложный",
  }

  const toggleEndingVisibility = (caseType: string, number: "singular" | "plural") => {
    setHiddenEndings((prev) => ({
      ...prev,
      [`${caseType}_${number}`]: !prev[`${caseType}_${number}`],
    }))
  }

  const renderAccusativeCase = (number: "singular" | "plural", gender: "masculine" | "feminine" | "neuter" | "all") => {
    if (hiddenEndings[`accusative_${number}`]) {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleEndingVisibility("accusative", number)}
          className="h-6 text-xs"
        >
          <Eye size={14} className="mr-1" /> Show
        </Button>
      )
    }

    const data =
      number === "singular"
        ? adjectiveDeclensions.singular[gender === "all" ? "masculine" : gender].accusative
        : adjectiveDeclensions.plural.all.accusative

    const exampleData =
      number === "singular"
        ? examples.singular[gender === "all" ? "masculine" : gender].accusative
        : examples.plural.all.accusative

    return (
      <>
        <div>
          <div className="text-sm font-medium">Inanimate:</div>
          <div className="font-medium">{typeof data === "object" ? data.inanimate : data}</div>
          {showExamples && (
            <div className="text-sm text-muted-foreground mt-1">
              {typeof exampleData === "object" ? exampleData.inanimate : ""}
            </div>
          )}
        </div>
        <div className="mt-2">
          <div className="text-sm font-medium">Animate:</div>
          <div className="font-medium">{typeof data === "object" ? data.animate : data}</div>
          {showExamples && (
            <div className="text-sm text-muted-foreground mt-1">
              {typeof exampleData === "object" ? exampleData.animate : ""}
            </div>
          )}
        </div>
      </>
    )
  }

  const renderNormalCase = (
    number: "singular" | "plural",
    gender: "masculine" | "feminine" | "neuter" | "all",
    caseType: string,
  ) => {
    if (hiddenEndings[`${caseType}_${number}`]) {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleEndingVisibility(caseType, number)}
          className="h-6 text-xs"
        >
          <Eye size={14} className="mr-1" /> Show
        </Button>
      )
    }

    const data =
      number === "singular"
        ? adjectiveDeclensions.singular[gender === "all" ? "masculine" : gender][
            caseType as keyof typeof adjectiveDeclensions.singular.masculine
          ]
        : adjectiveDeclensions.plural.all[caseType as keyof typeof adjectiveDeclensions.plural.all]

    const exampleData =
      number === "singular"
        ? examples.singular[gender === "all" ? "masculine" : gender][
            caseType as keyof typeof examples.singular.masculine
          ]
        : examples.plural.all[caseType as keyof typeof examples.plural.all]

    return (
      <>
        <div className="font-medium">{typeof data === "object" ? JSON.stringify(data) : data}</div>
        {showExamples && (
          <div className="text-sm text-muted-foreground mt-1">{typeof exampleData === "object" ? "" : exampleData}</div>
        )}
      </>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant={selectedGender === "masculine" ? "default" : "outline"}
          onClick={() => setSelectedGender("masculine")}
        >
          Masculine
        </Button>
        <Button
          variant={selectedGender === "feminine" ? "default" : "outline"}
          onClick={() => setSelectedGender("feminine")}
        >
          Feminine
        </Button>
        <Button
          variant={selectedGender === "neuter" ? "default" : "outline"}
          onClick={() => setSelectedGender("neuter")}
        >
          Neuter
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Switch id="adj-examples" checked={showExamples} onCheckedChange={setShowExamples} />
          <Label htmlFor="adj-examples">Show Examples</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="adj-hide-endings"
            checked={Object.keys(hiddenEndings).length > 0}
            onCheckedChange={(checked) => {
              if (checked) {
                // Hide all endings
                const allHidden: Record<string, boolean> = {}
                cases.forEach((caseType) => {
                  allHidden[`${caseType}_singular`] = true
                  allHidden[`${caseType}_plural`] = true
                })
                setHiddenEndings(allHidden)
              } else {
                // Show all endings
                setHiddenEndings({})
              }
            }}
          />
          <Label htmlFor="adj-hide-endings">Hide Endings (Test Mode)</Label>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Case</TableHead>
              <TableHead>Singular</TableHead>
              <TableHead>Plural (All Genders)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cases.map((caseType) => (
              <TableRow key={caseType}>
                <TableCell className="font-medium">
                  {caseTranslations[caseType as keyof typeof caseTranslations]}
                  <div className="text-xs text-muted-foreground">{caseType}</div>
                </TableCell>
                <TableCell>
                  {caseType === "accusative"
                    ? renderAccusativeCase("singular", selectedGender)
                    : renderNormalCase("singular", selectedGender, caseType)}
                </TableCell>
                <TableCell>
                  {caseType === "accusative"
                    ? renderAccusativeCase("plural", "all")
                    : renderNormalCase("plural", "all", caseType)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {Object.keys(hiddenEndings).length > 0 && (
        <div className="flex justify-center mt-4">
          <Button onClick={() => setHiddenEndings({})}>
            <Eye className="mr-2 h-4 w-4" /> Reveal All Endings
          </Button>
        </div>
      )}
    </div>
  )
}

