"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

// Russian noun declension data with accusative case separated for animate/inanimate
const nounDeclensions = {
  masculine: {
    singular: {
      nominative: "-∅, -й, -ь",
      genitive: "-а, -я",
      dative: "-у, -ю",
      accusative: {
        inanimate: "-∅, -й, -ь",
        animate: "-а, -я, -я",
      },
      instrumental: "-ом, -ем, -ём",
      prepositional: "-е, -и",
    },
    plural: {
      nominative: "-ы, -и",
      genitive: "-ов, -ев, -ёв, -ей, -∅",
      dative: "-ам, -ям",
      accusative: {
        inanimate: "-ы, -и",
        animate: "-ов, -ев, -ей",
      },
      instrumental: "-ами, -ями",
      prepositional: "-ах, -ях",
    },
  },
  feminine: {
    singular: {
      nominative: "-а, -я, -ь",
      genitive: "-ы, -и",
      dative: "-е, -и",
      accusative: {
        inanimate: "-у, -ю, -ь",
        animate: "-у, -ю, -ь",
      },
      instrumental: "-ой, -ей, -ёй, -ью",
      prepositional: "-е, -и",
    },
    plural: {
      nominative: "-ы, -и",
      genitive: "-∅, -ей",
      dative: "-ам, -ям",
      accusative: {
        inanimate: "-ы, -и",
        animate: "-∅, -ей",
      },
      instrumental: "-ами, -ями",
      prepositional: "-ах, -ях",
    },
  },
  neuter: {
    singular: {
      nominative: "-о, -е",
      genitive: "-а, -я",
      dative: "-у, -ю",
      accusative: {
        inanimate: "-о, -е",
        animate: "-о, -е",
      },
      instrumental: "-ом, -ем",
      prepositional: "-е, -и",
    },
    plural: {
      nominative: "-а, -я",
      genitive: "-∅, -ев, -ей",
      dative: "-ам, -ям",
      accusative: {
        inanimate: "-а, -я",
        animate: "-а, -я",
      },
      instrumental: "-ами, -ями",
      prepositional: "-ах, -ях",
    },
  },
}

// Example words for each gender
const examples = {
  masculine: {
    singular: {
      nominative: "стол, музей, словарь",
      genitive: "стола, музея",
      dative: "столу, музею",
      accusative: {
        inanimate: "стол, музей, словарь",
        animate: "человека, героя, коня",
      },
      instrumental: "столом, музеем",
      prepositional: "столе, музее",
    },
    plural: {
      nominative: "столы, музеи",
      genitive: "столов, музеев, словарей",
      dative: "столам, музеям",
      accusative: {
        inanimate: "столы, музеи",
        animate: "людей, героев",
      },
      instrumental: "столами, музеями",
      prepositional: "столах, музеях",
    },
  },
  feminine: {
    singular: {
      nominative: "книга, неделя, дверь",
      genitive: "книги, недели, двери",
      dative: "книге, неделе, двери",
      accusative: {
        inanimate: "книгу, неделю, дверь",
        animate: "маму, кошку",
      },
      instrumental: "книгой, неделей, дверью",
      prepositional: "книге, неделе, двери",
    },
    plural: {
      nominative: "книги, недели, двери",
      genitive: "книг, недель, дверей",
      dative: "книгам, неделям, дверям",
      accusative: {
        inanimate: "книги, недели, двери",
        animate: "мам, кошек",
      },
      instrumental: "книгами, неделями, дверями",
      prepositional: "книгах, неделях, дверях",
    },
  },
  neuter: {
    singular: {
      nominative: "окно, море",
      genitive: "окна, моря",
      dative: "окну, морю",
      accusative: {
        inanimate: "окно, море",
        animate: "животное",
      },
      instrumental: "окном, морем",
      prepositional: "окне, море",
    },
    plural: {
      nominative: "окна, моря",
      genitive: "окон, морей",
      dative: "окнам, морям",
      accusative: {
        inanimate: "окна, моря",
        animate: "животные",
      },
      instrumental: "окнами, морями",
      prepositional: "окнах, морях",
    },
  },
}

export default function NounDeclensionTable() {
  const [selectedGender, setSelectedGender] = useState<"masculine" | "feminine" | "neuter">("masculine")
  const [showExamples, setShowExamples] = useState(false)
  const [hiddenEndings, setHiddenEndings] = useState<Record<string, boolean>>({})

  const toggleEndingVisibility = (caseType: string, number: "singular" | "plural") => {
    const key = `${caseType}_${number}`

    setHiddenEndings((prev) => {
      // If the ending is currently hidden, show it
      if (prev[key]) {
        const newState = { ...prev }
        delete newState[key]
        return newState
      }
      // If the ending is currently visible, hide it
      else {
        return {
          ...prev,
          [key]: true,
        }
      }
    })
  }

  const cases = ["nominative", "genitive", "dative", "accusative", "instrumental", "prepositional"]
  const caseTranslations = {
    nominative: "Именительный",
    genitive: "Родительный",
    dative: "Дательный",
    accusative: "Винительный",
    instrumental: "Творительный",
    prepositional: "Предложный",
  }

  const renderAccusativeCase = (number: "singular" | "plural", gender: "masculine" | "feminine" | "neuter") => {
    const key = `accusative_${number}`

    if (hiddenEndings[key]) {
      return (
        <Button variant="ghost" size="sm" className="h-6 text-xs">
          <Eye size={14} className="mr-1" /> Show
        </Button>
      )
    }

    const data =
      number === "singular" ? nounDeclensions[gender].singular.accusative : nounDeclensions[gender].plural.accusative

    const exampleData =
      number === "singular" ? examples[gender].singular.accusative : examples[gender].plural.accusative

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
    gender: "masculine" | "feminine" | "neuter",
    caseType: string,
  ) => {
    const key = `${caseType}_${number}`

    if (hiddenEndings[key]) {
      return (
        <Button variant="ghost" size="sm" className="h-6 text-xs">
          <Eye size={14} className="mr-1" /> Show
        </Button>
      )
    }

    const data =
      number === "singular"
        ? nounDeclensions[gender].singular[caseType as keyof typeof nounDeclensions.masculine.singular]
        : nounDeclensions[gender].plural[caseType as keyof typeof nounDeclensions.masculine.plural]

    const exampleData =
      number === "singular"
        ? examples[gender].singular[caseType as keyof typeof examples.masculine.singular]
        : examples[gender].plural[caseType as keyof typeof examples.masculine.plural]

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
          <Switch id="examples" checked={showExamples} onCheckedChange={setShowExamples} />
          <Label htmlFor="examples">Show Examples</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="hide-endings"
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
          <Label htmlFor="hide-endings">Hide Endings (Test Mode)</Label>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Case</TableHead>
              <TableHead>Singular</TableHead>
              <TableHead>Plural</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cases.map((caseType) => (
              <TableRow key={caseType}>
                <TableCell className="font-medium">
                  {caseTranslations[caseType as keyof typeof caseTranslations]}
                  <div className="text-xs text-muted-foreground">{caseType}</div>
                </TableCell>
                <TableCell onClick={() => toggleEndingVisibility(caseType, "singular")}>
                  {caseType === "accusative"
                    ? renderAccusativeCase("singular", selectedGender)
                    : renderNormalCase("singular", selectedGender, caseType)}
                </TableCell>
                <TableCell onClick={() => toggleEndingVisibility(caseType, "plural")}>
                  {caseType === "accusative"
                    ? renderAccusativeCase("plural", selectedGender)
                    : renderNormalCase("plural", selectedGender, caseType)}
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

