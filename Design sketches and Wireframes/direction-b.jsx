// Direction B — "Modern Minimal"
// Clean, dashboard-forward, neutral grays with confident accent. Geist sans + mono.
// Sidebar style is denser, layout is more grid-driven, type is sharper.

const B_NAV = [
  { id: "dashboard",  label: "Overview",     icon: "home" },
  { id: "logbook",    label: "Entries",      icon: "feed" },
  { id: "compose",    label: "Compose",      icon: "edit" },
  { id: "badges",     label: "Badges",       icon: "star" },
  { id: "directory",  label: "Crews",        icon: "users" },
  { id: "approvals",  label: "Review",       icon: "check" },
];

function BShell({ children, theme, font, currentRoute, onRoute, badge = 0 }) {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: theme.bg, color: theme.ink,
      fontFamily: font.body,
      display: "grid",
      gridTemplateColumns: "60px 1fr",
      overflow: "hidden",
    }}>
      <aside style={{
        background: theme.surface, borderRight: `1px solid ${theme.rule}`,
        padding: "14px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
      }}>
        {/* Logo */}
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: theme.accent, color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: font.body, fontWeight: 700, fontSize: 14,
          marginBottom: 16,
        }}>R</div>

        {B_NAV.map(item => {
          const active = currentRoute === item.id;
          return (
            <div key={item.id} style={{ position: "relative" }}>
              <button
                onClick={() => onRoute(item.id)}
                title={item.label}
                style={{
                  appearance: "none", border: "none", cursor: "pointer",
                  background: active ? theme.accentSoft : "transparent",
                  color: active ? theme.accent : theme.inkMuted,
                  width: 40, height: 40, borderRadius: 8,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 120ms, color 120ms",
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = theme.ink; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = theme.inkMuted; }}
              >
                <Icon name={item.icon} size={17}/>
              </button>
              {item.id === "approvals" && badge > 0 && (
                <span style={{
                  position: "absolute", top: 0, right: 0,
                  background: theme.danger, color: "#fff",
                  fontSize: 9, fontWeight: 700, fontFamily: font.mono,
                  padding: "1px 4px", borderRadius: 999, lineHeight: 1.4,
                  pointerEvents: "none",
                }}>{badge}</span>
              )}
            </div>
          );
        })}
        <div style={{ flex: 1 }}/>
        <BAvatar name={ROVER.name} size={32} theme={theme} font={font}/>
      </aside>

      <main style={{ overflow: "auto", display: "flex", flexDirection: "column" }}>
        <BTopbar currentRoute={currentRoute} theme={theme} font={font}/>
        <div style={{ flex: 1, overflow: "auto" }}>{children}</div>
      </main>
    </div>
  );
}

function BTopbar({ currentRoute, theme, font }) {
  const item = B_NAV.find(n => n.id === currentRoute);
  return (
    <div style={{
      borderBottom: `1px solid ${theme.rule}`,
      background: theme.surface,
      padding: "0 24px",
      height: 48,
      display: "flex", alignItems: "center", gap: 16,
      fontFamily: font.body,
    }}>
      <div style={{ fontSize: 13, color: theme.inkMuted, fontFamily: font.mono }}>
        roverlogbook<span style={{ color: theme.inkMuted }}>.lk</span>
        <span style={{ margin: "0 6px", color: theme.rule }}>/</span>
        <span style={{ color: theme.ink }}>{(item || {}).label || ""}</span>
      </div>
      <div style={{ flex: 1 }}/>
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        background: theme.bg, border: `1px solid ${theme.rule}`,
        borderRadius: 6, padding: "5px 10px", width: 280,
        color: theme.inkMuted, fontSize: 12.5,
      }}>
        <Icon name="search" size={13}/>
        <span style={{ flex: 1 }}>Search entries, crews, badges…</span>
        <span style={{ fontFamily: font.mono, fontSize: 10, padding: "1px 5px", border: `1px solid ${theme.rule}`, borderRadius: 3 }}>⌘K</span>
      </div>
      <button style={{
        appearance: "none", border: `1px solid ${theme.rule}`,
        background: theme.surface, color: theme.ink, cursor: "pointer",
        width: 30, height: 30, borderRadius: 6,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative",
      }}>
        <Icon name="bell" size={14}/>
        <span style={{ position: "absolute", top: 5, right: 6, width: 6, height: 6, borderRadius: "50%", background: theme.accent }}/>
      </button>
    </div>
  );
}

function BAvatar({ name, size = 32, theme, font }) {
  const initials = name.split(" ").map(s => s[0]).slice(0, 2).join("");
  return (
    <div style={{
      width: size, height: size, borderRadius: 8,
      background: theme.ruleSoft, color: theme.ink,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: font.body, fontWeight: 600, fontSize: size * 0.4,
      border: `1px solid ${theme.rule}`,
    }}>{initials}</div>
  );
}

// ─── Page header ──────────────────────────────────────────────
function BPageHeader({ title, subtitle, action, theme, font }) {
  return (
    <div style={{
      padding: "24px 28px 18px 28px",
      borderBottom: `1px solid ${theme.rule}`,
      display: "flex", alignItems: "flex-start", gap: 18,
    }}>
      <div style={{ flex: 1 }}>
        <h1 style={{
          fontFamily: font.body, fontSize: 22, fontWeight: 600,
          margin: 0, color: theme.ink, letterSpacing: -0.6, lineHeight: 1.2,
        }}>{title}</h1>
        {subtitle && (
          <div style={{ fontSize: 13, color: theme.inkMuted, marginTop: 4, maxWidth: 600 }}>
            {subtitle}
          </div>
        )}
      </div>
      {action}
    </div>
  );
}

// ─── Stat tile (dashboard-style with delta) ──────────────────
function BStatTile({ label, value, delta, sub, theme, font }) {
  return (
    <div style={{
      background: theme.card, border: `1px solid ${theme.rule}`,
      padding: "14px 16px", borderRadius: 10,
      display: "flex", flexDirection: "column", gap: 6,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 11.5, color: theme.inkMuted, fontWeight: 500 }}>{label}</div>
        {delta && (
          <div style={{
            fontFamily: font.mono, fontSize: 10.5, color: theme.ok,
            background: theme.accentSoft, padding: "1px 6px", borderRadius: 3,
          }}>{delta}</div>
        )}
      </div>
      <div style={{
        fontFamily: font.body, fontSize: 26, fontWeight: 600,
        color: theme.ink, lineHeight: 1, letterSpacing: -0.6,
      }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: theme.inkMuted, fontFamily: font.mono }}>{sub}</div>}
    </div>
  );
}

// ─── Post card ────────────────────────────────────────────────
function BPostCard({ post, theme, font, density = "spacious", onOpen }) {
  const compact = density === "compact";
  const typeLabel = (POST_TYPES.find(t => t.id === post.type) || {}).label || post.type;
  const tone = post.type === "crew-event" ? "warm" : post.type === "crew-meeting" ? "forest" : post.type === "crew-in-council" ? "sky" : "dusk";
  return (
    <article
      onClick={onOpen}
      style={{
        background: theme.card, border: `1px solid ${theme.rule}`,
        padding: compact ? "12px 14px" : "16px 18px",
        borderRadius: 10,
        display: "grid",
        gridTemplateColumns: post.photos > 0 && !compact ? "100px 1fr" : "1fr",
        gap: 14, cursor: "pointer",
        transition: "border-color 120ms, transform 120ms",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = theme.inkMuted; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.rule; }}
    >
      {post.photos > 0 && !compact && (
        <PhotoPlaceholder label="cover" w="100%" h={92} theme={theme} font={font} tone={tone}/>
      )}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <Chip tone="accent" theme={theme} font={font}>{typeLabel}</Chip>
          {post.status === "pending" && <Chip tone="warn" theme={theme} font={font}>Pending</Chip>}
          <span style={{ fontFamily: font.mono, fontSize: 10.5, color: theme.inkMuted }}>
            {new Date(post.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
          </span>
        </div>
        <h3 style={{
          fontFamily: font.body, fontSize: compact ? 14 : 16, fontWeight: 600,
          margin: "0 0 4px 0", color: theme.ink, letterSpacing: -0.3, lineHeight: 1.25,
        }}>{post.title}</h3>
        {!compact && (
          <p style={{
            fontSize: 12.5, color: theme.inkSoft, lineHeight: 1.5,
            margin: 0, textWrap: "pretty",
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>{post.excerpt}</p>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, fontSize: 11, color: theme.inkMuted, marginTop: 8, fontFamily: font.mono }}>
          {post.location && <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}><Icon name="pin" size={11}/>{post.location}</span>}
          {post.attendees > 0 && <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}><Icon name="users" size={11}/>{post.attendees}</span>}
          {post.photos > 0 && <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}><Icon name="image" size={11}/>{post.photos}</span>}
        </div>
      </div>
    </article>
  );
}

// ─── Dashboard ────────────────────────────────────────────────
function BDashboard({ theme, font, density, layout, badgeStyle, onRoute }) {
  return (
    <div>
      <BPageHeader
        title={`Hi, ${ROVER.name.split(" ")[0]}`}
        subtitle={`${ROVER.troop} · ${STATS.pendingApprovals} entries pending review`}
        action={<button onClick={() => onRoute("compose")} style={btnB(theme, font)}><Icon name="plus" size={13}/> New entry</button>}
        theme={theme} font={font}
      />

      <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 22 }}>
        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          <BStatTile label="Crew Meetings" value={STATS.meetingsAttended} delta="+3" sub="this month" theme={theme} font={font}/>
          <BStatTile label="Events" value={STATS.eventsAttended} delta="+1" sub="this month" theme={theme} font={font}/>
          <BStatTile label="Posts" value={STATS.postsPublished} sub={`${STATS.pendingApprovals} pending`} theme={theme} font={font}/>
          <BStatTile label="Service hours" value={STATS.hoursOfService} delta="+12h" sub="towards Knight" theme={theme} font={font}/>
        </div>

        {/* Body grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: layout === "split" ? "1.5fr 1fr" : layout === "wide" ? "1fr" : "1fr 1.5fr",
          gap: 18, alignItems: "start",
        }}>
          {/* Recent log */}
          <section>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <h2 style={sectionHB(theme, font)}>Recent entries</h2>
              <button onClick={() => onRoute("logbook")} style={linkBtnB(theme, font)}>View all<Icon name="arrow" size={11}/></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: density === "compact" ? 6 : 10 }}>
              {POSTS.slice(0, density === "compact" ? 5 : 3).map(p => (
                <BPostCard key={p.id} post={p} theme={theme} font={font} density={density} onOpen={() => onRoute("logbook")}/>
              ))}
            </div>
          </section>

          {/* Right rail */}
          <aside style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={panelB(theme)}>
              <div style={panelHeaderB(theme, font)}>
                <span>Activity</span>
                <span style={{ fontFamily: font.mono, fontSize: 10.5, color: theme.accent }}>
                  {STATS.streakWeeks}w streak
                </span>
              </div>
              <div style={{ padding: 14 }}>
                <ActivityHeatmap data={ACTIVITY} theme={theme} columns={14} cell={10} gap={3}/>
              </div>
            </div>

            <div style={panelB(theme)}>
              <div style={panelHeaderB(theme, font)}>
                <span>Recent badges</span>
                <button onClick={() => onRoute("badges")} style={linkBtnB(theme, font)}>{STATS.badgesEarned} →</button>
              </div>
              <div style={{ padding: 14, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                {BADGES.filter(b => b.earned).slice(0, 3).map(b => (
                  <div key={b.id} style={{ textAlign: "center" }}>
                    <BadgeGlyph tier={b.tier} earned={b.earned} size={48} style={badgeStyle} theme={theme}/>
                    <div style={{ fontSize: 11, marginTop: 4, color: theme.ink, fontWeight: 500 }}>{b.name}</div>
                    <div style={{ fontFamily: font.mono, fontSize: 9.5, color: theme.inkMuted }}>{b.tier}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={panelB(theme)}>
              <div style={panelHeaderB(theme, font)}>Towards Rover Knight</div>
              <div style={{ padding: 14 }}>
                <ProgressBar pct={71} label="142 / 200 service hrs" theme={theme} font={font}/>
                <ProgressBar pct={47} label="47 / 100 meetings" theme={theme} font={font}/>
                <ProgressBar pct={75} label="9 / 12 badges" theme={theme} font={font} last/>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ pct, label, theme, font, last }) {
  return (
    <div style={{ marginBottom: last ? 0 : 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: theme.inkSoft, marginBottom: 5, fontFamily: font.mono }}>
        <span>{label}</span><span>{pct}%</span>
      </div>
      <div style={{ height: 5, background: theme.ruleSoft, borderRadius: 999, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: theme.accent, borderRadius: 999 }}/>
      </div>
    </div>
  );
}

// ─── Logbook ──────────────────────────────────────────────────
function BLogbook({ theme, font, density, onRoute }) {
  const [filter, setFilter] = React.useState("all");
  const filtered = filter === "all" ? POSTS : POSTS.filter(p => p.type === filter);
  return (
    <div>
      <BPageHeader
        title="Entries"
        subtitle={`${POSTS.filter(p => p.status === "approved").length} approved · ${POSTS.filter(p => p.status === "pending").length} pending`}
        action={<button onClick={() => onRoute("compose")} style={btnB(theme, font)}><Icon name="plus" size={13}/> New entry</button>}
        theme={theme} font={font}
      />
      <div style={{ padding: "18px 28px 28px 28px" }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 16, flexWrap: "wrap" }}>
          <FilterTabB active={filter === "all"} onClick={() => setFilter("all")} theme={theme} font={font}>All</FilterTabB>
          {POST_TYPES.map(t => (
            <FilterTabB key={t.id} active={filter === t.id} onClick={() => setFilter(t.id)} theme={theme} font={font}>{t.label}</FilterTabB>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: density === "compact" ? 6 : 10 }}>
          {filtered.map(p => <BPostCard key={p.id} post={p} theme={theme} font={font} density={density} onOpen={() => {}}/>)}
        </div>
      </div>
    </div>
  );
}

function FilterTabB({ active, onClick, children, theme, font }) {
  return (
    <button onClick={onClick} style={{
      appearance: "none",
      border: `1px solid ${active ? theme.ink : theme.rule}`,
      background: active ? theme.ink : "transparent",
      color: active ? theme.surface : theme.inkSoft,
      fontFamily: font.body, fontSize: 12, fontWeight: 500,
      padding: "5px 11px", borderRadius: 6, cursor: "pointer",
      transition: "border-color 120ms, background 120ms, color 120ms",
    }}>{children}</button>
  );
}

// ─── Compose ──────────────────────────────────────────────────
function BCompose({ theme, font, onRoute }) {
  const [type, setType] = React.useState("crew-meeting");
  const [title, setTitle] = React.useState("Weekly Crew Meeting · 30 April");
  const [body, setBody] = React.useState("Agenda was set by the Crew Mate. We opened with the prayer and then walked through the last fortnight's commitments. Sumudu reported on the Wellawatte project; the shelter has confirmed our slot for Saturday morning.\n\nAction items:\n— Three more volunteers needed for the Saturday shift\n— Imash to source banner from the print shop in Maradana\n— Tashi will draft the post-event report by Wednesday");
  const [photos, setPhotos] = React.useState([1, 2]);
  const [submitted, setSubmitted] = React.useState(false);
  const isArticle = type === "article";

  return (
    <div>
      <BPageHeader
        title={submitted ? "Submitted for review" : isArticle ? "New article" : "New entry"}
        subtitle={
          submitted
            ? "Your Skipper will review this within 48 hours."
            : "Drafts are private until you submit. Submitted entries are reviewed by your Crew Leader."
        }
        action={
          submitted
            ? <button onClick={() => onRoute("logbook")} style={btnB(theme, font)}>Back to entries</button>
            : <div style={{ display: "flex", gap: 6 }}>
                <button style={btnGhostB(theme, font)}>Save draft</button>
                <button onClick={() => setSubmitted(true)} style={btnB(theme, font)}>
                  Submit for approval
                </button>
              </div>
        }
        theme={theme} font={font}
      />

      <div style={{ padding: 28, display: "grid", gridTemplateColumns: "1fr 280px", gap: 22, alignItems: "start" }}>
        <div style={{ ...panelB(theme), padding: 0, overflow: "hidden" }}>
          {submitted && (
            <div style={{
              background: theme.accentSoft, color: theme.accent,
              padding: "10px 16px", fontSize: 12.5,
              borderBottom: `1px solid ${theme.rule}`,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <Icon name="check" size={13}/> Submitted 10:42 — awaiting <strong>Skipper Asela Wickrama</strong>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, borderBottom: `1px solid ${theme.rule}` }}>
            <FieldB label="Type" theme={theme} font={font}>
              <select value={type} onChange={(e) => setType(e.target.value)} style={selectB(theme, font)} disabled={submitted}>
                {POST_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
            </FieldB>
            <FieldB label="Date" theme={theme} font={font}>
              <input style={inputB(theme, font)} defaultValue="30 Apr 2026" disabled={submitted}/>
            </FieldB>
            {!isArticle ? (
              <FieldB label="Location" theme={theme} font={font} last>
                <input style={inputB(theme, font)} defaultValue="Crew Den, Colombo 10" disabled={submitted}/>
              </FieldB>
            ) : (
              <FieldB label="Tags" theme={theme} font={font} last>
                <input style={inputB(theme, font)} defaultValue="service, reflection" disabled={submitted}/>
              </FieldB>
            )}
          </div>

          <div style={{ padding: "20px 22px 0 22px" }}>
            <input
              value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder="Title…"
              disabled={submitted}
              style={{
                appearance: "none", border: "none", outline: "none", width: "100%",
                fontFamily: font.body, fontSize: 24, fontWeight: 600,
                color: theme.ink, background: "transparent", letterSpacing: -0.6,
              }}
            />
          </div>

          <div style={{ padding: "8px 22px 18px 22px" }}>
            <textarea
              value={body} onChange={(e) => setBody(e.target.value)}
              disabled={submitted}
              placeholder="Write the body of your entry…"
              style={{
                appearance: "none", border: "none", outline: "none", width: "100%",
                fontFamily: font.body, fontSize: 14, color: theme.ink,
                background: "transparent", lineHeight: 1.55, minHeight: 220,
                resize: "vertical",
              }}
            />
          </div>

          {!isArticle && (
            <div style={{ padding: "14px 22px 20px 22px", borderTop: `1px solid ${theme.rule}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontSize: 11.5, color: theme.inkMuted, fontWeight: 500 }}>
                  Photos · {photos.length} / 6
                </div>
                {!submitted && photos.length < 6 && (
                  <button onClick={() => setPhotos([...photos, photos.length + 1])} style={linkBtnB(theme, font)}>
                    <Icon name="plus" size={11}/> Add
                  </button>
                )}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 6 }}>
                {photos.map((p, i) => (
                  <div key={i} style={{ position: "relative" }}>
                    <PhotoPlaceholder label={`${i+1}`} h={64} theme={theme} font={font} tone={["warm","forest","sky","dusk"][i%4]}/>
                    {!submitted && (
                      <button onClick={() => setPhotos(photos.filter((_, j) => j !== i))} style={{
                        position: "absolute", top: 3, right: 3, width: 16, height: 16,
                        background: "rgba(0,0,0,0.7)", color: "#fff", border: "none",
                        borderRadius: "50%", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center", padding: 0,
                      }}><Icon name="x" size={9}/></button>
                    )}
                  </div>
                ))}
                {!submitted && photos.length < 6 && (
                  <button onClick={() => setPhotos([...photos, photos.length + 1])} style={{
                    height: 64, border: `1px dashed ${theme.rule}`,
                    background: "transparent", color: theme.inkMuted, cursor: "pointer",
                    borderRadius: 6, fontSize: 11, fontFamily: font.body,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}><Icon name="plus" size={12}/></button>
                )}
              </div>
            </div>
          )}
        </div>

        <aside style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={panelB(theme)}>
            <div style={panelHeaderB(theme, font)}>Workflow</div>
            <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              <BStatusStep done label="Drafted" theme={theme} font={font}/>
              <BStatusStep done={submitted} active={!submitted} label="Submitted" theme={theme} font={font}/>
              <BStatusStep label="Reviewed" theme={theme} font={font}/>
              <BStatusStep label="Published" theme={theme} font={font}/>
            </div>
          </div>
          <div style={panelB(theme)}>
            <div style={panelHeaderB(theme, font)}>Reviewer</div>
            <div style={{ padding: 14, display: "flex", alignItems: "center", gap: 10 }}>
              <BAvatar name="Asela Wickrama" size={36} theme={theme} font={font}/>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: theme.ink }}>Skipper Asela Wickrama</div>
                <div style={{ fontFamily: font.mono, fontSize: 10.5, color: theme.inkMuted }}>Avg. response · 14h</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function BStatusStep({ done, active, label, theme, font }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: 16, height: 16, borderRadius: "50%",
        border: `1.5px solid ${done ? theme.accent : active ? theme.warn : theme.rule}`,
        background: done ? theme.accent : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        {done && <Icon name="check" size={9} color="#fff" strokeWidth={2.5}/>}
        {active && !done && <div style={{ width: 5, height: 5, borderRadius: "50%", background: theme.warn }}/>}
      </div>
      <div style={{ fontSize: 12.5, color: done ? theme.ink : active ? theme.warn : theme.inkMuted, fontWeight: done || active ? 500 : 400 }}>{label}</div>
    </div>
  );
}

// ─── Badges ───────────────────────────────────────────────────
function BBadges({ theme, font, badgeStyle }) {
  return (
    <div>
      <BPageHeader
        title="Badges"
        subtitle="Earned distinctions and progress towards the next."
        theme={theme} font={font}
      />
      <div style={{ padding: 28 }}>
        <div style={{ marginBottom: 12, fontSize: 11.5, color: theme.inkMuted, fontWeight: 500, fontFamily: font.mono }}>
          EARNED · {BADGES.filter(b => b.earned).length}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 24 }}>
          {BADGES.filter(b => b.earned).map(b => <BBadgeCard key={b.id} badge={b} theme={theme} font={font} style={badgeStyle}/>)}
        </div>
        <div style={{ marginBottom: 12, fontSize: 11.5, color: theme.inkMuted, fontWeight: 500, fontFamily: font.mono }}>
          IN PROGRESS · {BADGES.filter(b => !b.earned).length}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {BADGES.filter(b => !b.earned).map(b => <BBadgeCard key={b.id} badge={b} theme={theme} font={font} style={badgeStyle}/>)}
        </div>
      </div>
    </div>
  );
}

function BBadgeCard({ badge, theme, font, style }) {
  return (
    <div style={{
      background: theme.card, border: `1px solid ${theme.rule}`,
      padding: 14, borderRadius: 10,
      display: "grid", gridTemplateColumns: "auto 1fr", gap: 12, alignItems: "center",
      opacity: badge.earned ? 1 : 0.85,
    }}>
      <BadgeGlyph tier={badge.tier} earned={badge.earned} size={48} style={style} theme={theme}/>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: theme.ink }}>{badge.name}</div>
        <div style={{ fontFamily: font.mono, fontSize: 10, color: theme.inkMuted, marginTop: 2 }}>
          {badge.tier} {badge.earned ? `· ${badge.date}` : "· locked"}
        </div>
        <div style={{ fontSize: 11.5, color: theme.inkSoft, marginTop: 6, lineHeight: 1.4 }}>{badge.desc}</div>
      </div>
    </div>
  );
}

// ─── Directory ────────────────────────────────────────────────
function BDirectory({ theme, font }) {
  return (
    <div>
      <BPageHeader title="Crews" subtitle="Rover crews in the Colombo district." theme={theme} font={font}/>
      <div style={{ padding: 28 }}>
        <div style={{
          background: theme.card, border: `1px solid ${theme.rule}`,
          borderRadius: 10, overflow: "hidden",
        }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1.5fr 0.7fr 0.7fr 1fr 1fr 60px",
            padding: "10px 16px", borderBottom: `1px solid ${theme.rule}`,
            background: theme.surface,
            fontSize: 10.5, color: theme.inkMuted, fontWeight: 600, fontFamily: font.mono,
            letterSpacing: 0.6, textTransform: "uppercase",
          }}>
            <div>Crew</div><div>Founded</div><div>Members</div><div>Crew Mate</div><div>Den</div><div></div>
          </div>
          {DIRECTORY.map((t, i) => (
            <div key={t.troop} style={{
              display: "grid", gridTemplateColumns: "1.5fr 0.7fr 0.7fr 1fr 1fr 60px",
              padding: "14px 16px",
              borderBottom: i < DIRECTORY.length - 1 ? `1px solid ${theme.rule}` : "none",
              fontSize: 13, color: theme.ink, alignItems: "center",
              cursor: "pointer", transition: "background 120ms",
            }}
              onMouseEnter={(e) => e.currentTarget.style.background = theme.bg}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 6,
                  background: t.color, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: font.body, fontWeight: 700, fontSize: 11,
                }}>{t.troop.split(" ")[0]}</div>
                <span style={{ fontWeight: 500 }}>{t.troop}</span>
              </div>
              <div style={{ fontFamily: font.mono, fontSize: 12, color: theme.inkSoft }}>{t.founded}</div>
              <div style={{ fontFamily: font.mono, fontSize: 12, color: theme.inkSoft }}>{t.members}</div>
              <div style={{ color: theme.inkSoft }}>{t.mate}</div>
              <div style={{ color: theme.inkSoft }}>{t.den}</div>
              <div style={{ color: theme.inkMuted, textAlign: "right" }}><Icon name="arrow" size={13}/></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Approvals ────────────────────────────────────────────────
function BApprovals({ theme, font }) {
  const [queue, setQueue] = React.useState(APPROVAL_QUEUE);
  const decide = (id) => setQueue(queue.filter(q => q.id !== id));
  return (
    <div>
      <BPageHeader
        title="Review queue"
        subtitle={`${queue.length} entries awaiting review`}
        theme={theme} font={font}
      />
      <div style={{ padding: 28 }}>
        {queue.length === 0 ? (
          <div style={{ ...panelB(theme), padding: 50, textAlign: "center", color: theme.inkMuted }}>
            <Icon name="check" size={28} color={theme.accent}/>
            <div style={{ fontSize: 16, fontWeight: 600, color: theme.ink, marginTop: 10 }}>All caught up</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>No entries awaiting review.</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {queue.map(item => {
              const typeLabel = (POST_TYPES.find(t => t.id === item.type) || {}).label || item.type;
              return (
                <div key={item.id} style={{
                  background: theme.card, border: `1px solid ${theme.rule}`,
                  borderRadius: 10, padding: "14px 18px",
                  display: "grid", gridTemplateColumns: "1fr auto", gap: 18,
                }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <BAvatar name={item.rover} size={24} theme={theme} font={font}/>
                      <div style={{ fontSize: 12.5, fontWeight: 600, color: theme.ink }}>{item.rover}</div>
                      <span style={{ color: theme.inkMuted, fontSize: 11.5, fontFamily: font.mono }}>{item.troop}</span>
                      <span style={{ color: theme.inkMuted, fontSize: 11.5, marginLeft: "auto", fontFamily: font.mono }}>{item.submittedAt}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                      <Chip tone="accent" theme={theme} font={font}>{typeLabel}</Chip>
                      {item.photos > 0 && <span style={{ fontSize: 11, color: theme.inkMuted, display: "inline-flex", alignItems: "center", gap: 3, fontFamily: font.mono }}><Icon name="image" size={11}/>{item.photos}</span>}
                    </div>
                    <h3 style={{ fontFamily: font.body, fontSize: 15, fontWeight: 600, margin: "0 0 4px 0", color: theme.ink, letterSpacing: -0.3 }}>{item.title}</h3>
                    <p style={{ fontSize: 12, color: theme.inkSoft, lineHeight: 1.5, margin: 0 }}>{item.excerpt}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5, justifyContent: "center", minWidth: 120 }}>
                    <button onClick={() => decide(item.id)} style={btnB(theme, font)}>
                      <Icon name="check" size={12}/> Approve
                    </button>
                    <button onClick={() => decide(item.id)} style={btnGhostB(theme, font)}>
                      Request changes
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Onboarding ──────────────────────────────────────────────
function BOnboarding({ theme, font }) {
  const [step, setStep] = React.useState(1);
  const total = 3;
  return (
    <div style={{ minHeight: "100%", background: theme.bg, padding: "60px 80px", color: theme.ink }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <div style={{ marginBottom: 28, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: theme.accent, color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: 14,
          }}>R</div>
          <div style={{ fontFamily: font.body, fontSize: 16, fontWeight: 600, letterSpacing: -0.3 }}>Rover Logbook</div>
          <div style={{ flex: 1 }}/>
          <div style={{ fontFamily: font.mono, fontSize: 11, color: theme.inkMuted }}>Step {step} / {total}</div>
        </div>

        {/* progress */}
        <div style={{ display: "flex", gap: 6, marginBottom: 26 }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ flex: 1, height: 3, background: i <= step ? theme.accent : theme.ruleSoft, borderRadius: 999 }}/>
          ))}
        </div>

        <div style={{ ...panelB(theme), padding: 28 }}>
          {step === 1 && (
            <>
              <h2 style={onbHB(theme, font)}>Tell us about you</h2>
              <p style={onbPB(theme)}>Standard details. Editable later.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <FieldB2 label="Full name" theme={theme} font={font}><input style={inputB(theme, font, true)} defaultValue="Shaun Fernando"/></FieldB2>
                <FieldB2 label="Pronouns" theme={theme} font={font}><input style={inputB(theme, font, true)} defaultValue="he/him"/></FieldB2>
                <FieldB2 label="Date of birth" theme={theme} font={font}><input style={inputB(theme, font, true)} defaultValue="14 Aug 2001"/></FieldB2>
                <FieldB2 label="City" theme={theme} font={font}><input style={inputB(theme, font, true)} defaultValue="Colombo"/></FieldB2>
                <FieldB2 label="Email" theme={theme} font={font}><input style={inputB(theme, font, true)} defaultValue="shaun.f@rovers.lk"/></FieldB2>
                <FieldB2 label="Mobile" theme={theme} font={font}><input style={inputB(theme, font, true)} defaultValue="+94 77 412 8830"/></FieldB2>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <h2 style={onbHB(theme, font)}>Choose your crew</h2>
              <p style={onbPB(theme)}>Pick the troop you belong to.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {TROOPS.map((t, i) => (
                  <label key={t} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "10px 12px", border: `1px solid ${i === 3 ? theme.accent : theme.rule}`,
                    background: i === 3 ? theme.accentSoft : "transparent",
                    borderRadius: 8, cursor: "pointer",
                  }}>
                    <input type="radio" name="troop" defaultChecked={i === 3} style={{ accentColor: theme.accent }}/>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 500 }}>{t}</div>
                      <div style={{ fontFamily: font.mono, fontSize: 10.5, color: theme.inkMuted, marginTop: 2 }}>
                        {DIRECTORY[i].members} members · {DIRECTORY[i].den}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <h2 style={onbHB(theme, font)}>Final touch</h2>
              <p style={onbPB(theme)}>A motto for your profile cover.</p>
              <FieldB2 label="Personal motto" theme={theme} font={font}>
                <input style={inputB(theme, font, true)} defaultValue="Service Above Self"/>
              </FieldB2>
              <div style={{ marginTop: 20, padding: 16, background: theme.bg, borderRadius: 8, fontSize: 12.5, color: theme.inkSoft, lineHeight: 1.5, border: `1px solid ${theme.rule}` }}>
                Your Skipper will be notified to confirm your enrollment in the {ROVER.troop}.
              </div>
            </>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 26 }}>
            <button onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1} style={{ ...btnGhostB(theme, font), opacity: step === 1 ? 0.4 : 1 }}>
              Back
            </button>
            <button onClick={() => setStep(Math.min(total, step + 1))} style={btnB(theme, font)}>
              {step === total ? "Create profile" : "Continue"} <Icon name="arrow" size={12}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Public profile ──────────────────────────────────────────
function BPublicProfile({ theme, font, density, badgeStyle }) {
  const approved = POSTS.filter(p => p.status === "approved");
  return (
    <div style={{ background: theme.bg, minHeight: "100%" }}>
      <div style={{
        background: theme.surface, padding: "28px 32px 22px 32px",
        borderBottom: `1px solid ${theme.rule}`,
      }}>
        <div style={{ fontFamily: font.mono, fontSize: 10.5, color: theme.inkMuted, marginBottom: 12 }}>
          roverlogbook.lk/{ROVER.handle.replace("@","")}
        </div>
        <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
          <BAvatar name={ROVER.name} size={72} theme={theme} font={font}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: font.mono, fontSize: 11, color: theme.accent, marginBottom: 4 }}>
              {ROVER.troop} · {ROVER.role}
            </div>
            <h1 style={{ fontFamily: font.body, fontSize: 28, fontWeight: 600, margin: 0, color: theme.ink, letterSpacing: -0.6 }}>
              {ROVER.name}
            </h1>
            <div style={{ fontSize: 13.5, color: theme.inkSoft, marginTop: 4 }}>
              “{ROVER.motto}”
            </div>
            <div style={{ display: "flex", gap: 14, marginTop: 10, fontSize: 12, color: theme.inkMuted, flexWrap: "wrap", fontFamily: font.mono }}>
              <span><Icon name="pin" size={11}/> {ROVER.city}</span>
              <span>Rover since {ROVER.joinedYear}</span>
              <span>{STATS.streakWeeks}w streak</span>
            </div>
          </div>
          <button style={btnGhostB(theme, font)}>Follow</button>
        </div>

        <div style={{
          marginTop: 20, display: "grid", gridTemplateColumns: "repeat(5, 1fr)",
          gap: 10, paddingTop: 16, borderTop: `1px solid ${theme.rule}`,
        }}>
          {[
            ["Published", STATS.postsPublished],
            ["Meetings", STATS.meetingsAttended],
            ["Events", STATS.eventsAttended],
            ["Badges", STATS.badgesEarned],
            ["Service hrs", STATS.hoursOfService],
          ].map(([label, n]) => (
            <div key={label}>
              <div style={{ fontFamily: font.body, fontSize: 22, fontWeight: 600, color: theme.ink, lineHeight: 1, letterSpacing: -0.5 }}>{n}</div>
              <div style={{ fontFamily: font.mono, fontSize: 10.5, color: theme.inkMuted, marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "24px 32px", display: "grid", gridTemplateColumns: "1fr 240px", gap: 22 }}>
        <section>
          <h2 style={sectionHB(theme, font)}>Logbook</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: density === "compact" ? 6 : 10, marginTop: 10 }}>
            {approved.map(p => <BPostCard key={p.id} post={p} theme={theme} font={font} density={density}/>)}
          </div>
        </section>
        <aside style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={panelB(theme)}>
            <div style={panelHeaderB(theme, font)}>Badges</div>
            <div style={{ padding: 12, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
              {BADGES.filter(b => b.earned).slice(0, 6).map(b => (
                <div key={b.id} style={{ textAlign: "center" }}>
                  <BadgeGlyph tier={b.tier} earned={b.earned} size={40} style={badgeStyle} theme={theme}/>
                  <div style={{ fontSize: 9.5, color: theme.inkMuted, marginTop: 2, fontFamily: font.mono }}>{b.name}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={panelB(theme)}>
            <div style={panelHeaderB(theme, font)}>About</div>
            <div style={{ padding: 12, fontSize: 12, color: theme.inkSoft, lineHeight: 1.5 }}>
              Software engineer; Rover since 2022. Hiking, service, writing.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// ─── Style helpers ──────────────────────────────────────────
const panelB = (theme) => ({
  background: theme.card, border: `1px solid ${theme.rule}`,
  borderRadius: 10, overflow: "hidden",
});
const panelHeaderB = (theme, font) => ({
  padding: "9px 14px", borderBottom: `1px solid ${theme.rule}`,
  display: "flex", justifyContent: "space-between", alignItems: "center",
  fontFamily: font.body, fontSize: 12, color: theme.ink, fontWeight: 600,
});
const sectionHB = (theme, font) => ({
  fontFamily: font.body, fontSize: 14, fontWeight: 600,
  margin: 0, color: theme.ink, letterSpacing: -0.3,
});
const btnB = (theme, font) => ({
  appearance: "none", border: "none", cursor: "pointer",
  background: theme.ink, color: theme.surface,
  fontFamily: font.body, fontSize: 12.5, fontWeight: 500,
  padding: "7px 13px", borderRadius: 6,
  display: "inline-flex", alignItems: "center", gap: 6,
});
const btnGhostB = (theme, font) => ({
  appearance: "none", cursor: "pointer",
  background: "transparent", color: theme.ink,
  border: `1px solid ${theme.rule}`,
  fontFamily: font.body, fontSize: 12.5, fontWeight: 500,
  padding: "6px 12px", borderRadius: 6,
  display: "inline-flex", alignItems: "center", gap: 5,
});
const linkBtnB = (theme, font) => ({
  appearance: "none", border: "none", background: "transparent",
  color: theme.inkSoft, fontFamily: font.body, fontSize: 11.5, fontWeight: 500,
  cursor: "pointer", padding: 0,
  display: "inline-flex", alignItems: "center", gap: 3,
});
const inputB = (theme, font, full) => ({
  appearance: "none", border: `1px solid ${theme.rule}`,
  background: theme.surface, color: theme.ink,
  fontFamily: font.body, fontSize: 12.5,
  padding: "6px 9px", borderRadius: 6, outline: "none",
  width: full ? "100%" : "100%",
});
const selectB = (theme, font) => ({ ...inputB(theme, font, true) });
const onbHB = (theme, font) => ({
  fontFamily: font.body, fontSize: 20, fontWeight: 600,
  margin: "0 0 4px 0", color: theme.ink, letterSpacing: -0.5,
});
const onbPB = (theme) => ({
  fontSize: 13, color: theme.inkMuted, margin: "0 0 20px 0",
});

function FieldB({ label, children, theme, font, last }) {
  return (
    <div style={{
      padding: "10px 14px",
      borderRight: last ? "none" : `1px solid ${theme.rule}`,
      display: "flex", flexDirection: "column", gap: 4,
    }}>
      <div style={{ fontFamily: font.mono, fontSize: 9.5, color: theme.inkMuted, letterSpacing: 0.5, textTransform: "uppercase" }}>{label}</div>
      {children}
    </div>
  );
}
function FieldB2({ label, children, theme, font }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <div style={{ fontSize: 11.5, color: theme.inkSoft, fontWeight: 500 }}>{label}</div>
      {children}
    </div>
  );
}

// ─── App container ───────────────────────────────────────────
function BRoverApp({ initialRoute = "dashboard", theme, font, density, layout, badgeStyle }) {
  const [route, setRoute] = React.useState(initialRoute);
  const props = { theme, font, density, layout, badgeStyle, onRoute: setRoute };
  let body;
  if (route === "dashboard") body = <BDashboard {...props}/>;
  else if (route === "logbook") body = <BLogbook {...props}/>;
  else if (route === "compose") body = <BCompose {...props}/>;
  else if (route === "badges") body = <BBadges {...props}/>;
  else if (route === "directory") body = <BDirectory {...props}/>;
  else if (route === "approvals") body = <BApprovals {...props}/>;
  else body = <BDashboard {...props}/>;
  return (
    <BShell theme={theme} font={font} currentRoute={route} onRoute={setRoute} badge={STATS.pendingApprovals}>
      {body}
    </BShell>
  );
}

Object.assign(window, { BRoverApp, BOnboarding, BPublicProfile });
