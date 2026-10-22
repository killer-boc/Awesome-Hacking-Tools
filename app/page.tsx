"use client"

import { useMemo, useState } from "react"
import "./styles.css"

type Tool = { name: string; version: string; description: string; category: string; command: string; risk: "Low" | "Medium" | "High" }

const tools: Tool[] = [
  { name: "0trace", version: "1.5", description: "A hop enumeration tool", category: "Network", command: "0trace --target <host>", risk: "Medium" },
  { name: "Amass", version: "1.4.0", description: "DNS subdomain enumeration and attack surface discovery", category: "Recon", command: "amass enum -d <domain>", risk: "Medium" },
  { name: "arp-scan", version: "1.9", description: "Discover and fingerprint IP hosts on the local network", category: "Network", command: "arp-scan --localnet", risk: "High" },
  { name: "binwalk", version: "2.0.1", description: "Search binary images for embedded files", category: "Forensics", command: "binwalk <file>", risk: "Low" },
  { name: "cewl", version: "4.3", description: "Generate custom word lists from a website", category: "Password Audit", command: "cewl <url> -w words.txt", risk: "Medium" },
  { name: "checksec", version: "1.5", description: "Check Linux binary security features", category: "System Audit", command: "checksec --file=<binary>", risk: "Low" },
  { name: "nmap", version: "7.94", description: "Network discovery and security auditing", category: "Network", command: "nmap -sV <target>", risk: "High" },
  { name: "sublist3r", version: "1.0", description: "Enumerate subdomains for penetration testers", category: "Recon", command: "sublist3r -d <domain>", risk: "Medium" },
]

export default function Home() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All tools")
  const [selected, setSelected] = useState<Tool>(tools[1])
  const [running, setRunning] = useState(false)
  const [output, setOutput] = useState<string[]>(["Ready. Select a tool to create an execution session."])
  const categories = ["All tools", ...Array.from(new Set(tools.map((tool) => tool.category)))]
  const filtered = useMemo(() => tools.filter((tool) => (category === "All tools" || tool.category === category) && `${tool.name} ${tool.description}`.toLowerCase().includes(query.toLowerCase())), [query, category])

  function runTool() {
    setRunning(true)
    setOutput([`$ ${selected.command}`, "", "Preparing isolated session...", "Validating target and arguments...", "Session started. Awaiting runner connection."])
    window.setTimeout(() => setRunning(false), 1500)
  }

  return <main className="shell">
    <header className="topbar"><div className="brand"><span className="brand-mark">AH</span><div><strong>Awesome Hacking Tools</strong><span>Execution workspace</span></div></div><div className="connection"><i /> Runner online</div></header>
    <section className="intro"><div><p className="eyebrow">SCRIPT OPERATIONS / v0.1</p><h1>Run your security toolkit<br /><em>from one workspace.</em></h1><p className="lede">Browse the repository catalog, configure a command, and launch it inside an isolated runner.</p></div><div className="stats"><div><strong>{tools.length}</strong><span>available tools</span></div><div><strong>04</strong><span>categories</span></div></div></section>
    <section className="workspace">
      <aside className="catalog"><div className="section-head"><div><span className="label">CATALOG</span><h2>Available scripts</h2></div><span className="count">{filtered.length.toString().padStart(2, "0")}</span></div><input className="search" placeholder="Search scripts..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <div className="categories">{categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div>
        <div className="tool-list">{filtered.map((tool) => <button className={`tool ${selected.name === tool.name ? "selected" : ""}`} key={tool.name} onClick={() => { setSelected(tool); setOutput(["Ready. Select Run to start a session."]) }}><span className="tool-icon">›_</span><span className="tool-copy"><b>{tool.name}</b><small>{tool.description}</small></span><span className="tool-version">{tool.version}</span></button>)}</div>
      </aside>
      <section className="console"><div className="console-head"><div><span className="label">EXECUTION SESSION</span><h2>{selected.name}</h2></div><span className={`risk ${selected.risk.toLowerCase()}`}>{selected.risk} impact</span></div><p className="description">{selected.description}</p><div className="command-box"><span>COMMAND</span><code>{selected.command}</code><button onClick={() => navigator.clipboard?.writeText(selected.command)} aria-label="Copy command">Copy</button></div><div className="terminal"><div className="terminal-bar"><span><i /> <i /> <i /></span><small>isolated-runner / bash</small><span className={running ? "live" : "idle"}>{running ? "RUNNING" : "IDLE"}</span></div><div className="terminal-body">{output.map((line, index) => <div key={index} className={index === 0 ? "prompt" : "muted"}>{line || "\u00a0"}</div>)}</div></div><div className="actions"><button className="run" onClick={runTool} disabled={running}>{running ? "Starting session..." : "Run script"}<span>→</span></button><button className="secondary" onClick={() => setOutput(["Session cleared."])}>Clear output</button></div><p className="notice">Only run tools against systems you own or are explicitly authorized to test. All sessions are isolated and logged.</p></section>
    </section>
  </main>
}
