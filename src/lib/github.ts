import { cacheLife } from "next/cache"

export type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }
export type Calendar = { total: number; weeks: Day[][] }

const levels = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
} as const

const query = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
  }
}`

// Last year of contributions from GitHub's GraphQL API, refreshed daily.
// Needs GITHUB_TOKEN (any token, no scopes) and GITHUB_USERNAME; returns null without them.
export async function getContributions(): Promise<Calendar | null> {
  "use cache"
  cacheLife("days")

  const token = process.env.GITHUB_TOKEN
  const login = process.env.GITHUB_USERNAME
  if (!token || !login) return null

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { login } }),
    })
    if (!res.ok) return null
    const json = await res.json()
    const cal = json.data?.user?.contributionsCollection.contributionCalendar
    if (!cal) return null
    return {
      total: cal.totalContributions,
      weeks: cal.weeks.map((w: { contributionDays: { date: string; contributionCount: number; contributionLevel: keyof typeof levels }[] }) =>
        w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount, level: levels[d.contributionLevel] })),
      ),
    }
  } catch {
    return null
  }
}
