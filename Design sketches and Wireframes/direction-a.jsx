// Direction A — "Field Journal"
// Warm paper-toned background, deep forest green accent, serif display + clean sans body.
// Editorial / journal-like aesthetic.

const A_NAV = [
  { id: "dashboard",  label: "Dashboard",   icon: "home" },
  { id: "logbook",    label: "My Logbook",  icon: "book" },
  { id: "compose",    label: "New Entry",   icon: "edit" },
  { id: "badges",     label: "Badges",      icon: "badge" },
  { id: "directory",  label: "Troops",      icon: "troop" },
  { id: "approvals",  label: "Approvals",   icon: "check" },
];

// ─── Shell ────────────────────────────────────────────────────
function AShell({ children, theme, font, currentRoute, onRoute, badge = 0, density = "spacious", layout = "split" }) {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: theme.bg, color: theme.ink,
      fontFamily: font.body,
      display: "grid",
      gridTemplateColumns: "232px 1fr",
      overflow: "hidden",
    }}>
      {/* Sidebar */}
      <aside style={{
        background: theme.surface,
        borderRight: `1px solid ${theme.rule}`,
        padding: "22px 16px",
        display: "flex", flexDirection: "column", gap: 4,
      }}>
        <div style={{ padding: "4px 8px 18px 8px", borderBottom: `1px solid ${theme.rule}`, marginBottom: 10 }}>
          <div style={{
            fontFamily: font.serif, fontSize: 22, fontWeight: 500,
            letterSpacing: -0.4, color: theme.ink, lineHeight: 1.05,
          }}>
            The Rover<br/><em style={{ color: theme.accent, fontWeight: 400 }}>Logbook</em>
          </div>
          <div style={{
            fontFamily: FONT_B_MONO, fontSize: 9.5, color: theme.inkMuted,
            letterSpacing: 1.2, textTransform: "uppercase", marginTop: 6,
          }}>
            Est. MMXXVI · Vol. I
          </div>
        </div>

        {A_NAV.map(item => {
          const active = currentRoute === item.id;
          return (
            <button key={item.id}
              onClick={() => onRoute(item.id)}
              style={{
                appearance: "none", border: "none", textAlign: "left",
                background: active ? theme.accentSoft : "transparent",
                color: active ? theme.accent : theme.inkSoft,
                fontFamily: font.body, fontSize: 13.5, fontWeight: active ? 600 : 500,
                padding: "9px 10px", borderRadius: 6,
                display: "flex", alignItems: "center", gap: 10,
                cursor: "pointer",
                transition: "background 120ms, color 120ms",
              }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = theme.ruleSoft; }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
            >
              <Icon name={item.icon} size={15} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.id === "approvals" && badge > 0 && (
                <span style={{
                  background: theme.accent, color: theme.surface,
                  fontSize: 10, fontWeight: 600,
                  padding: "1px 6px", borderRadius: 999,
                }}>{badge}</span>
              )}
            </button>
          );
        })}

        <div style={{ flex: 1 }}/>

        {/* Mini profile */}
        <div style={{
          padding: 10, borderTop: `1px solid ${theme.rule}`,
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <AAvatar name={ROVER.name} size={32} theme={theme} font={font}/>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: theme.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ROVER.name}</div>
            <div style={{ fontSize: 10.5, color: theme.inkMuted }}>{ROVER.troop}</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ overflow: "auto", position: "relative" }}>
        {children}
      </main>
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────
function AAvatar({ name, size = 40, theme, font }) {
  const initials = name.split(" ").map(s => s[0]).slice(0, 2).join("");
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: theme.accentSoft, color: theme.accent,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: font.serif, fontWeight: 500, fontSize: size * 0.42,
      border: `1px solid ${theme.accent}`,
      flexShrink: 0,
    }}>{initials}</div>
  );
}

// ─── Page header ──────────────────────────────────────────────
function APageHeader({ kicker, title, subtitle, action, theme, font }) {
  return (
    <div style={{
      padding: "26px 36px 18px 36px",
      borderBottom: `1px solid ${theme.rule}`,
      display: "flex", alignItems: "flex-end", gap: 24,
    }}>
      <div style={{ flex: 1 }}>
        {kicker && (
          <div style={{
            fontFamily: FONT_B_MONO, fontSize: 10, color: theme.inkMuted,
            letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 5,
          }}>{kicker}</div>
        )}
        <h1 style={{
          fontFamily: font.serif, fontSize: 32, fontWeight: 500,
          margin: 0, color: theme.ink, letterSpacing: -0.5, lineHeight: 1.1,
        }}>{title}</h1>
        {subtitle && (
          <div style={{ fontSize: 13, color: theme.inkMuted, marginTop: 6, maxWidth: 600 }}>
            {subtitle}
          </div>
        )}
      </div>
      {action}
    </div>
  );
}

// ─── Stat tile ────────────────────────────────────────────────
function AStatTile({ label, value, sub, theme, font }) {
  return (
    <div style={{
      background: theme.card, border: `1px solid ${theme.rule}`,
      padding: "16px 18px", borderRadius: 4,
      display: "flex", flexDirection: "column", gap: 4,
    }}>
      <div style={{
        fontFamily: FONT_B_MONO, fontSize: 9.5, color: theme.inkMuted,
        letterSpacing: 1.2, textTransform: "uppercase",
      }}>{label}</div>
      <div style={{
        fontFamily: font.serif, fontSize: 30, fontWeight: 500,
        color: theme.ink, lineHeight: 1, letterSpacing: -0.5,
      }}>{value}</div>
      {sub && <div style={{ fontSize: 11.5, color: theme.inkSoft }}>{sub}</div>}
    </div>
  );
}

// ─── Post card ────────────────────────────────────────────────
function APostCard({ post, theme, font, density = "spacious", onOpen }) {
  const compact = density === "compact";
  const typeLabel = (POST_TYPES.find(t => t.id === post.type) || {}).label || post.type;
  const tone = post.type === "crew-event" ? "warm" : post.type === "crew-meeting" ? "forest" : post.type === "crew-in-council" ? "sky" : "dusk";
  return (
    <article
      onClick={onOpen}
      style={{
        background: theme.card, border: `1px solid ${theme.rule}`,
        padding: compact ? "14px 16px" : "18px 22px",
        borderRadius: 4,
        display: "grid",
        gridTemplateColumns: post.photos > 0 && !compact ? "1fr 140px" : "1fr",
        gap: 18,
        cursor: "pointer",
        transition: "border-color 120ms, transform 120ms",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = theme.accent; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.rule; }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <Chip tone="accent" theme={theme} font={font}>{typeLabel}</Chip>
          {post.status === "pending" && <Chip tone="warn" theme={theme} font={font}>Pending review</Chip>}
          <span style={{ fontFamily: FONT_B_MONO, fontSize: 10.5, color: theme.inkMuted, letterSpacing: 1, textTransform: "uppercase" }}>
            {new Date(post.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
          </span>
        </div>
        <h3 style={{
          fontFamily: font.serif, fontSize: compact ? 17 : 21, fontWeight: 500,
          margin: "0 0 6px 0", color: theme.ink, letterSpacing: -0.3, lineHeight: 1.2,
        }}>{post.title}</h3>
        {!compact && (
          <p style={{
            fontSize: 13, color: theme.inkSoft, lineHeight: 1.55,
            margin: "0 0 10px 0", textWrap: "pretty",
          }}>{post.excerpt}</p>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, fontSize: 11.5, color: theme.inkMuted, marginTop: 8 }}>
          {post.location && <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Icon name="pin" size={12}/>{post.location}</span>}
          {post.duration && <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Icon name="clock" size={12}/>{post.duration}</span>}
          {post.attendees > 0 && <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Icon name="users" size={12}/>{post.attendees} present</span>}
          {post.photos > 0 && <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Icon name="image" size={12}/>{post.photos} photos</span>}
        </div>
      </div>
      {post.photos > 0 && !compact && (
        <PhotoPlaceholder label="cover" w="100%" h={120} theme={theme} font={font} tone={tone}/>
      )}
    </article>
  );
}

// ─── Dashboard ────────────────────────────────────────────────
function ADashboard({ theme, font, density, layout, badgeStyle, onRoute }) {
  return (
    <div>
      <APageHeader
        kicker={`Crew · ${ROVER.troop}`}
        title={`Welcome back, ${ROVER.name.split(" ")[0]}.`}
        subtitle={`The crew has been busy. ${STATS.pendingApprovals} of your entries are still being reviewed by Skipper Asela.`}
        action={
          <button onClick={() => onRoute("compose")} style={btnPrimary(theme, font)}>
            <Icon name="plus" size={14}/> New entry
          </button>
        }
        theme={theme} font={font}
      />

      <div style={{ padding: 36, display: "flex", flexDirection: "column", gap: 28 }}>
        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          <AStatTile label="Crew Meetings" value={STATS.meetingsAttended} sub="of 52 this year" theme={theme} font={font}/>
          <AStatTile label="Events Attended" value={STATS.eventsAttended} sub="across 4 troops" theme={theme} font={font}/>
          <AStatTile label="Posts Published" value={STATS.postsPublished} sub={`${STATS.pendingApprovals} pending`} theme={theme} font={font}/>
          <AStatTile label="Service Hours" value={STATS.hoursOfService} sub="towards Knight investiture" theme={theme} font={font}/>
        </div>

        {/* Two-column area */}
        <div style={{
          display: "grid",
          gridTemplateColumns: layout === "split" ? "1.6fr 1fr" : layout === "wide" ? "1fr" : "1fr 1.6fr",
          gap: 24, alignItems: "start",
        }}>
          {/* Recent log */}
          <section>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
              <h2 style={sectionH(theme, font)}>From the logbook</h2>
              <button onClick={() => onRoute("logbook")} style={linkBtn(theme, font)}>View all <Icon name="arrow" size={11}/></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: density === "compact" ? 8 : 14 }}>
              {POSTS.slice(0, density === "compact" ? 5 : 3).map(p => (
                <APostCard key={p.id} post={p} theme={theme} font={font} density={density} onOpen={() => onRoute("logbook")}/>
              ))}
            </div>
          </section>

          {/* Right rail */}
          <aside style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Activity heatmap */}
            <div style={panelStyle(theme)}>
              <div style={panelHeader(theme, font)}>
                <span>Activity · 14 weeks</span>
                <span style={{ fontFamily: FONT_B_MONO, fontSize: 10, color: theme.accent }}>
                  {STATS.streakWeeks}-week streak
                </span>
              </div>
              <div style={{ padding: 16 }}>
                <ActivityHeatmap data={ACTIVITY} theme={theme} columns={14} cell={11} gap={3}/>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 10.5, color: theme.inkMuted, fontFamily: FONT_B_MONO }}>
                  <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span>
                </div>
              </div>
            </div>

            {/* Featured badges */}
            <div style={panelStyle(theme)}>
              <div style={panelHeader(theme, font)}>
                <span>Recent badges</span>
                <button onClick={() => onRoute("badges")} style={linkBtn(theme, font)}>All {STATS.badgesEarned}</button>
              </div>
              <div style={{ padding: 16, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {BADGES.filter(b => b.earned).slice(0, 3).map(b => (
                  <div key={b.id} style={{ textAlign: "center" }}>
                    <BadgeGlyph tier={b.tier} earned={b.earned} size={56} style={badgeStyle} theme={theme}/>
                    <div style={{ fontFamily: font.serif, fontSize: 13, marginTop: 6, color: theme.ink }}>{b.name}</div>
                    <div style={{ fontFamily: FONT_B_MONO, fontSize: 9.5, color: theme.inkMuted, letterSpacing: 0.8, textTransform: "uppercase" }}>{b.tier} · {b.date}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pull-quote / motto */}
            <div style={{ ...panelStyle(theme), padding: 22, position: "relative" }}>
              <div style={{ position: "absolute", top: 8, left: 14, fontFamily: font.serif, fontSize: 56, color: theme.accent, opacity: 0.3, lineHeight: 1 }}>“</div>
              <div style={{ fontFamily: font.serif, fontSize: 17, fontStyle: "italic", color: theme.ink, lineHeight: 1.4, paddingLeft: 18 }}>
                Service above self.
              </div>
              <div style={{ fontFamily: FONT_B_MONO, fontSize: 10, color: theme.inkMuted, letterSpacing: 1, textTransform: "uppercase", marginTop: 10, paddingLeft: 18 }}>
                — Crew motto
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// ─── Logbook (full feed) ──────────────────────────────────────
function ALogbook({ theme, font, density, onRoute }) {
  const [filter, setFilter] = React.useState("all");
  const filtered = filter === "all" ? POSTS : POSTS.filter(p => p.type === filter);
  return (
    <div>
      <APageHeader
        kicker="Vol. I — Year 2026"
        title="My Logbook"
        subtitle={`${POSTS.filter(p => p.status === "approved").length} approved entries · ${POSTS.filter(p => p.status === "pending").length} awaiting review`}
        action={<button onClick={() => onRoute("compose")} style={btnPrimary(theme, font)}><Icon name="plus" size={14}/> New entry</button>}
        theme={theme} font={font}
      />
      <div style={{ padding: "20px 36px 36px 36px" }}>
        {/* filter row */}
        <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
          <FilterTab active={filter === "all"} onClick={() => setFilter("all")} theme={theme} font={font}>All entries</FilterTab>
          {POST_TYPES.map(t => (
            <FilterTab key={t.id} active={filter === t.id} onClick={() => setFilter(t.id)} theme={theme} font={font}>{t.label}</FilterTab>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: density === "compact" ? 8 : 14 }}>
          {filtered.map(p => <APostCard key={p.id} post={p} theme={theme} font={font} density={density} onOpen={() => {}}/>)}
        </div>
      </div>
    </div>
  );
}

function FilterTab({ active, onClick, children, theme, font }) {
  return (
    <button onClick={onClick} style={{
      appearance: "none", border: `1px solid ${active ? theme.accent : theme.rule}`,
      background: active ? theme.accentSoft : "transparent",
      color: active ? theme.accent : theme.inkSoft,
      fontFamily: font.body, fontSize: 12, fontWeight: 500,
      padding: "6px 12px", borderRadius: 999, cursor: "pointer",
      transition: "border-color 120ms, background 120ms, color 120ms",
    }}>{children}</button>
  );
}

// ─── Compose / new entry ──────────────────────────────────────
function ACompose({ theme, font, onRoute }) {
  const [type, setType] = React.useState("crew-meeting");
  const [title, setTitle] = React.useState("Weekly Crew Meeting · 30 April");
  const [body, setBody] = React.useState("Agenda was set by the Crew Mate. We opened with the prayer and then walked through the last fortnight's commitments. Sumudu reported on the Wellawatte project; the shelter has confirmed our slot for Saturday morning.\n\nAction items:\n— Three more volunteers needed for the Saturday shift\n— Imash to source banner from the print shop in Maradana\n— Tashi will draft the post-event report by Wednesday");
  const [photos, setPhotos] = React.useState([1, 2]);
  const [submitted, setSubmitted] = React.useState(false);
  const [location, setLocation] = React.useState("Crew Den, Colombo 10");
  const [duration, setDuration] = React.useState("1.5 hours");

  const isArticle = type === "article";

  return (
    <div>
      <APageHeader
        kicker={submitted ? "Submitted" : "Draft"}
        title={isArticle ? "Write an article" : "New logbook entry"}
        subtitle={
          submitted
            ? "Your entry has been sent to Skipper Asela for review. You'll be notified once it's approved."
            : "Compose your entry. Once submitted, it will go to your Rover Scout Leader for approval before appearing on your public profile."
        }
        action={
          submitted
            ? <button onClick={() => onRoute("logbook")} style={btnPrimary(theme, font)}>Back to logbook</button>
            : <div style={{ display: "flex", gap: 8 }}>
                <button style={btnGhost(theme, font)}>Save draft</button>
                <button onClick={() => setSubmitted(true)} style={btnPrimary(theme, font)}>
                  Submit for approval <Icon name="arrow" size={13}/>
                </button>
              </div>
        }
        theme={theme} font={font}
      />

      <div style={{ padding: 36, display: "grid", gridTemplateColumns: "1fr 280px", gap: 28, alignItems: "start" }}>
        {/* Left — editor */}
        <div style={{ ...panelStyle(theme), padding: 0, overflow: "hidden" }}>
          {submitted && (
            <div style={{
              background: theme.accentSoft, color: theme.accent,
              padding: "10px 18px", fontSize: 12.5,
              borderBottom: `1px solid ${theme.accent}`,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <Icon name="check" size={14}/> Submitted at 10:42 — awaiting review by <strong>Skipper Asela Wickrama</strong>
            </div>
          )}

          {/* Type + meta row */}
          <div style={{ display: "flex", gap: 0, padding: "16px 22px", borderBottom: `1px solid ${theme.rule}`, alignItems: "center", flexWrap: "wrap" }}>
            <Field label="Type" theme={theme} font={font}>
              <select value={type} onChange={(e) => setType(e.target.value)} style={selectStyle(theme, font)} disabled={submitted}>
                {POST_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
            </Field>
            {!isArticle && (
              <>
                <Field label="Location" theme={theme} font={font}>
                  <input value={location} onChange={(e) => setLocation(e.target.value)} style={inputStyle(theme, font)} disabled={submitted}/>
                </Field>
                <Field label="Duration" theme={theme} font={font}>
                  <input value={duration} onChange={(e) => setDuration(e.target.value)} style={inputStyle(theme, font)} disabled={submitted}/>
                </Field>
              </>
            )}
            <Field label="Date" theme={theme} font={font}>
              <input type="text" defaultValue="30 April 2026" style={inputStyle(theme, font)} disabled={submitted}/>
            </Field>
          </div>

          {/* Title */}
          <div style={{ padding: "22px 26px 10px 26px" }}>
            <input
              value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your entry a title…"
              disabled={submitted}
              style={{
                appearance: "none", border: "none", outline: "none", width: "100%",
                fontFamily: font.serif, fontSize: 28, fontWeight: 500,
                color: theme.ink, background: "transparent", letterSpacing: -0.4,
              }}
            />
          </div>

          {/* Body */}
          <div style={{ padding: "0 26px 18px 26px" }}>
            <textarea
              value={body} onChange={(e) => setBody(e.target.value)}
              disabled={submitted}
              placeholder="Tell the story of the meeting or event…"
              style={{
                appearance: "none", border: "none", outline: "none", width: "100%",
                fontFamily: font.serif, fontSize: 16, color: theme.ink,
                background: "transparent", lineHeight: 1.55, minHeight: 220,
                resize: "vertical",
              }}
            />
          </div>

          {/* Photos */}
          {!isArticle && (
            <div style={{ padding: "14px 26px 22px 26px", borderTop: `1px solid ${theme.rule}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ fontFamily: FONT_B_MONO, fontSize: 10, color: theme.inkMuted, letterSpacing: 1.2, textTransform: "uppercase" }}>
                  Photos · {photos.length} of 6
                </div>
                {!submitted && photos.length < 6 && (
                  <button onClick={() => setPhotos([...photos, photos.length + 1])} style={linkBtn(theme, font)}>
                    <Icon name="paperclip" size={11}/> Attach
                  </button>
                )}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                {photos.map((p, i) => (
                  <div key={i} style={{ position: "relative" }}>
                    <PhotoPlaceholder label={`img ${i+1}`} h={86} theme={theme} font={font} tone={["warm","forest","sky","dusk"][i%4]}/>
                    {!submitted && (
                      <button
                        onClick={() => setPhotos(photos.filter((_, j) => j !== i))}
                        style={{
                          position: "absolute", top: 4, right: 4, width: 18, height: 18,
                          background: "rgba(0,0,0,0.6)", color: "#fff", border: "none",
                          borderRadius: "50%", cursor: "pointer", display: "flex",
                          alignItems: "center", justifyContent: "center", padding: 0,
                        }}>
                        <Icon name="x" size={10}/>
                      </button>
                    )}
                  </div>
                ))}
                {!submitted && photos.length < 6 && (
                  <button
                    onClick={() => setPhotos([...photos, photos.length + 1])}
                    style={{
                      height: 86, border: `1px dashed ${theme.rule}`,
                      background: "transparent", color: theme.inkMuted,
                      cursor: "pointer", borderRadius: 2, fontSize: 11,
                      fontFamily: font.body,
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                    }}><Icon name="plus" size={12}/> Add photo</button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right — sidebar guidance */}
        <aside style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={panelStyle(theme)}>
            <div style={panelHeader(theme, font)}>Status</div>
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              <StatusStep done label="Drafted by you" theme={theme} font={font}/>
              <StatusStep done={submitted} active={!submitted} label="Submitted for approval" theme={theme} font={font}/>
              <StatusStep label="Reviewed by Crew Leader" theme={theme} font={font}/>
              <StatusStep label="Published to your logbook" theme={theme} font={font}/>
            </div>
          </div>
          <div style={panelStyle(theme)}>
            <div style={panelHeader(theme, font)}>Tips for a good entry</div>
            <ul style={{
              padding: "12px 16px 16px 32px", margin: 0,
              fontSize: 12, color: theme.inkSoft, lineHeight: 1.55,
              display: "flex", flexDirection: "column", gap: 6,
            }}>
              <li>Open with what happened, not what you felt about it.</li>
              <li>Note who was present — names matter.</li>
              <li>Record decisions and action items verbatim.</li>
              <li>Reflection comes last, and earns its place.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

function StatusStep({ done, active, label, theme, font }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: 18, height: 18, borderRadius: "50%",
        border: `1.5px solid ${done ? theme.accent : active ? theme.warn : theme.rule}`,
        background: done ? theme.accent : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        {done && <Icon name="check" size={10} color={theme.surface} strokeWidth={2.5}/>}
        {active && !done && <div style={{ width: 6, height: 6, borderRadius: "50%", background: theme.warn }}/>}
      </div>
      <div style={{ fontSize: 12.5, color: done ? theme.ink : active ? theme.warn : theme.inkMuted, fontWeight: done || active ? 500 : 400 }}>{label}</div>
    </div>
  );
}

// ─── Badges page ──────────────────────────────────────────────
function ABadges({ theme, font, badgeStyle }) {
  return (
    <div>
      <APageHeader
        kicker="Recognition"
        title="Badges & Distinctions"
        subtitle="Each badge represents a body of work — meetings attended, hours given, skills earned. The Knight investiture is the highest distinction in Rover scouting."
        theme={theme} font={font}
      />
      <div style={{ padding: 36 }}>
        <div style={{ marginBottom: 14, fontFamily: FONT_B_MONO, fontSize: 10.5, color: theme.inkMuted, letterSpacing: 1.5, textTransform: "uppercase" }}>
          Earned · {BADGES.filter(b => b.earned).length}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 30 }}>
          {BADGES.filter(b => b.earned).map(b => <ABadgeCard key={b.id} badge={b} theme={theme} font={font} style={badgeStyle}/>)}
        </div>
        <div style={{ marginBottom: 14, fontFamily: FONT_B_MONO, fontSize: 10.5, color: theme.inkMuted, letterSpacing: 1.5, textTransform: "uppercase" }}>
          In progress · {BADGES.filter(b => !b.earned).length}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {BADGES.filter(b => !b.earned).map(b => <ABadgeCard key={b.id} badge={b} theme={theme} font={font} style={badgeStyle}/>)}
        </div>
      </div>
    </div>
  );
}

function ABadgeCard({ badge, theme, font, style }) {
  return (
    <div style={{
      background: theme.card, border: `1px solid ${theme.rule}`,
      padding: 18, borderRadius: 4, textAlign: "center",
      opacity: badge.earned ? 1 : 0.85,
    }}>
      <BadgeGlyph tier={badge.tier} earned={badge.earned} size={70} style={style} theme={theme}/>
      <div style={{ fontFamily: font.serif, fontSize: 16, fontWeight: 500, marginTop: 10, color: theme.ink }}>{badge.name}</div>
      <div style={{ fontFamily: FONT_B_MONO, fontSize: 9.5, color: theme.inkMuted, letterSpacing: 1, textTransform: "uppercase", marginTop: 3 }}>
        {badge.tier} {badge.earned ? `· ${badge.date}` : ""}
      </div>
      <div style={{ fontSize: 11.5, color: theme.inkSoft, marginTop: 8, lineHeight: 1.4 }}>{badge.desc}</div>
    </div>
  );
}

// ─── Directory ────────────────────────────────────────────────
function ADirectory({ theme, font }) {
  return (
    <div>
      <APageHeader
        kicker="The Crews"
        title="Troop Directory"
        subtitle="Every Rover crew in the Colombo district. Click through to see their public logbook."
        theme={theme} font={font}
      />
      <div style={{ padding: 36, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        {DIRECTORY.map(t => (
          <div key={t.troop} style={{
            background: theme.card, border: `1px solid ${theme.rule}`,
            padding: 22, borderRadius: 4,
            display: "grid", gridTemplateColumns: "60px 1fr", gap: 16,
            cursor: "pointer", transition: "border-color 120ms",
          }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.accent}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = theme.rule}
          >
            <div style={{
              width: 60, height: 60, background: theme.ruleSoft, borderRadius: 4,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: font.serif, fontSize: 22, fontWeight: 500, color: theme.accent,
              border: `1px solid ${theme.rule}`,
            }}>{t.troop.split(" ")[0]}</div>
            <div>
              <div style={{ fontFamily: font.serif, fontSize: 18, fontWeight: 500, color: theme.ink, letterSpacing: -0.3 }}>{t.troop}</div>
              <div style={{ fontFamily: FONT_B_MONO, fontSize: 10, color: theme.inkMuted, letterSpacing: 1, textTransform: "uppercase", marginTop: 4 }}>
                Founded {t.founded} · {t.members} members
              </div>
              <div style={{ fontSize: 12, color: theme.inkSoft, marginTop: 8, display: "flex", gap: 14 }}>
                <span><strong style={{ color: theme.ink }}>Crew Mate:</strong> {t.mate}</span>
                <span><strong style={{ color: theme.ink }}>Den:</strong> {t.den}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Approvals (Skipper view) ─────────────────────────────────
function AApprovals({ theme, font }) {
  const [queue, setQueue] = React.useState(APPROVAL_QUEUE);
  const decide = (id, _action) => setQueue(queue.filter(q => q.id !== id));

  return (
    <div>
      <APageHeader
        kicker="Skipper · Asela Wickrama"
        title="Approval Queue"
        subtitle={`${queue.length} entries awaiting your review across the 21st Crew. Approved entries appear immediately on the rover's public profile.`}
        theme={theme} font={font}
      />
      <div style={{ padding: 36 }}>
        {queue.length === 0 ? (
          <div style={{
            ...panelStyle(theme), padding: 60, textAlign: "center",
            color: theme.inkMuted, fontSize: 14,
          }}>
            <Icon name="check" size={32} color={theme.accent}/>
            <div style={{ fontFamily: font.serif, fontSize: 20, color: theme.ink, marginTop: 12 }}>All caught up.</div>
            <div style={{ marginTop: 6 }}>No entries awaiting review.</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {queue.map(item => {
              const typeLabel = (POST_TYPES.find(t => t.id === item.type) || {}).label || item.type;
              return (
                <div key={item.id} style={{
                  background: theme.card, border: `1px solid ${theme.rule}`,
                  borderRadius: 4, padding: "18px 22px",
                  display: "grid", gridTemplateColumns: "1fr auto", gap: 20,
                }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <AAvatar name={item.rover} size={28} theme={theme} font={font}/>
                      <div style={{ fontWeight: 600, fontSize: 13, color: theme.ink }}>{item.rover}</div>
                      <span style={{ color: theme.inkMuted, fontSize: 12 }}>· {item.troop}</span>
                      <span style={{ color: theme.inkMuted, fontSize: 12, marginLeft: "auto" }}>{item.submittedAt}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <Chip tone="accent" theme={theme} font={font}>{typeLabel}</Chip>
                      {item.photos > 0 && <span style={{ fontSize: 11, color: theme.inkMuted, display: "inline-flex", alignItems: "center", gap: 4 }}><Icon name="image" size={11}/> {item.photos}</span>}
                    </div>
                    <h3 style={{ fontFamily: font.serif, fontSize: 19, fontWeight: 500, margin: "0 0 6px 0", color: theme.ink, letterSpacing: -0.3 }}>{item.title}</h3>
                    <p style={{ fontSize: 12.5, color: theme.inkSoft, lineHeight: 1.5, margin: 0 }}>{item.excerpt}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "stretch", justifyContent: "center", minWidth: 130 }}>
                    <button onClick={() => decide(item.id, "approve")} style={btnPrimary(theme, font)}>
                      <Icon name="check" size={13}/> Approve
                    </button>
                    <button onClick={() => decide(item.id, "request")} style={btnGhost(theme, font)}>
                      Request changes
                    </button>
                    <button style={{ ...linkBtn(theme, font), justifyContent: "center", marginTop: 4 }}>
                      Open full entry
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

// ─── Onboarding (profile creation) ────────────────────────────
function AOnboarding({ theme, font }) {
  const [step, setStep] = React.useState(1);
  const total = 3;
  return (
    <div style={{ minHeight: "100%", background: theme.bg, padding: "60px 80px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontFamily: font.serif, fontSize: 30, fontWeight: 500, color: theme.ink, letterSpacing: -0.5 }}>
            The Rover <em style={{ color: theme.accent, fontWeight: 400 }}>Logbook</em>
          </div>
          <div style={{ fontFamily: FONT_B_MONO, fontSize: 10.5, color: theme.inkMuted, letterSpacing: 1.5, textTransform: "uppercase", marginTop: 8 }}>
            Welcome — let's set up your crew profile · Step {step} of {total}
          </div>
        </div>

        <div style={{ ...panelStyle(theme), padding: 36 }}>
          {step === 1 && (
            <>
              <h2 style={onbH(theme, font)}>Your details</h2>
              <p style={onbP(theme)}>The basics. You can edit any of this later.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Field2 label="Full name" theme={theme} font={font}><input style={inputStyle(theme, font, true)} defaultValue="Shaun Fernando"/></Field2>
                <Field2 label="Pronouns" theme={theme} font={font}><input style={inputStyle(theme, font, true)} defaultValue="he/him"/></Field2>
                <Field2 label="Date of birth" theme={theme} font={font}><input style={inputStyle(theme, font, true)} defaultValue="14 August 2001"/></Field2>
                <Field2 label="City" theme={theme} font={font}><input style={inputStyle(theme, font, true)} defaultValue="Colombo"/></Field2>
                <Field2 label="Email" theme={theme} font={font}><input style={inputStyle(theme, font, true)} defaultValue="shaun.f@rovers.lk"/></Field2>
                <Field2 label="Mobile" theme={theme} font={font}><input style={inputStyle(theme, font, true)} defaultValue="+94 77 412 8830"/></Field2>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <h2 style={onbH(theme, font)}>Your crew</h2>
              <p style={onbP(theme)}>Pick the troop you belong to. If your troop isn't listed, ask your Skipper to register it.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {TROOPS.map((t, i) => (
                  <label key={t} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "12px 14px", border: `1px solid ${i === 3 ? theme.accent : theme.rule}`,
                    background: i === 3 ? theme.accentSoft : "transparent",
                    borderRadius: 4, cursor: "pointer",
                  }}>
                    <input type="radio" name="troop" defaultChecked={i === 3} style={{ accentColor: theme.accent }}/>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: font.serif, fontSize: 16, color: theme.ink }}>{t}</div>
                      <div style={{ fontFamily: FONT_B_MONO, fontSize: 10, color: theme.inkMuted, letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>
                        Founded {DIRECTORY[i].founded} · {DIRECTORY[i].members} members · {DIRECTORY[i].den}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <h2 style={onbH(theme, font)}>Almost there</h2>
              <p style={onbP(theme)}>One last thing — a personal motto for your logbook cover.</p>
              <Field2 label="Motto" theme={theme} font={font}>
                <input style={inputStyle(theme, font, true)} defaultValue="Service Above Self"/>
              </Field2>
              <div style={{ marginTop: 24, padding: 20, border: `1px dashed ${theme.rule}`, borderRadius: 4, fontSize: 12.5, color: theme.inkSoft, lineHeight: 1.5 }}>
                Your Skipper will be notified when you create your profile. They'll review and confirm your enrollment in the {ROVER.troop}, after which you can begin keeping your logbook.
              </div>
            </>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 30, paddingTop: 22, borderTop: `1px solid ${theme.rule}` }}>
            <button onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1} style={{ ...btnGhost(theme, font), opacity: step === 1 ? 0.4 : 1 }}>
              <Icon name="arrowL" size={13}/> Back
            </button>
            <button onClick={() => setStep(Math.min(total, step + 1))} style={btnPrimary(theme, font)}>
              {step === total ? "Create profile" : "Continue"} <Icon name="arrow" size={13}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Public profile view ─────────────────────────────────────
function APublicProfile({ theme, font, density, badgeStyle }) {
  const approved = POSTS.filter(p => p.status === "approved");
  return (
    <div style={{ background: theme.bg, minHeight: "100%" }}>
      {/* Banner */}
      <div style={{
        background: `linear-gradient(180deg, ${theme.accentSoft} 0%, ${theme.bg} 100%)`,
        padding: "28px 36px 22px 36px",
        borderBottom: `1px solid ${theme.rule}`,
      }}>
        <div style={{ fontFamily: FONT_B_MONO, fontSize: 10, color: theme.inkMuted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>
          Public profile · roverlogbook.lk/{ROVER.handle.replace("@","")}
        </div>
        <div style={{ display: "flex", gap: 22, alignItems: "flex-start" }}>
          <AAvatar name={ROVER.name} size={84} theme={theme} font={font}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONT_B_MONO, fontSize: 10, color: theme.accent, letterSpacing: 1.5, textTransform: "uppercase" }}>
              {ROVER.troop} · {ROVER.role}
            </div>
            <h1 style={{ fontFamily: font.serif, fontSize: 36, fontWeight: 500, margin: "4px 0 6px 0", color: theme.ink, letterSpacing: -0.6 }}>
              {ROVER.name}
            </h1>
            <div style={{ fontStyle: "italic", fontFamily: font.serif, fontSize: 15, color: theme.inkSoft }}>
              “{ROVER.motto}”
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 12, fontSize: 12, color: theme.inkSoft, flexWrap: "wrap" }}>
              <span><Icon name="pin" size={11}/> {ROVER.city}</span>
              <span><Icon name="clock" size={11}/> Rover since {ROVER.joinedYear}</span>
              <span><Icon name="flame" size={11}/> {STATS.streakWeeks}-week streak</span>
            </div>
          </div>
          <button style={btnGhost(theme, font)}>Follow crew</button>
        </div>

        {/* Inline stats */}
        <div style={{
          marginTop: 22, display: "grid", gridTemplateColumns: "repeat(5, 1fr)",
          gap: 0, borderTop: `1px solid ${theme.rule}`, paddingTop: 16,
        }}>
          <PubStat n={STATS.postsPublished} label="Published" theme={theme} font={font}/>
          <PubStat n={STATS.meetingsAttended} label="Meetings" theme={theme} font={font}/>
          <PubStat n={STATS.eventsAttended} label="Events" theme={theme} font={font}/>
          <PubStat n={STATS.badgesEarned} label="Badges" theme={theme} font={font}/>
          <PubStat n={STATS.hoursOfService} label="Service hrs" theme={theme} font={font}/>
        </div>
      </div>

      <div style={{ padding: "28px 36px", display: "grid", gridTemplateColumns: "1fr 260px", gap: 28 }}>
        <section>
          <h2 style={sectionH(theme, font)}>Logbook entries</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: density === "compact" ? 8 : 14, marginTop: 12 }}>
            {approved.map(p => <APostCard key={p.id} post={p} theme={theme} font={font} density={density}/>)}
          </div>
        </section>
        <aside style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={panelStyle(theme)}>
            <div style={panelHeader(theme, font)}>Badges</div>
            <div style={{ padding: 16, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {BADGES.filter(b => b.earned).slice(0, 6).map(b => (
                <div key={b.id} style={{ textAlign: "center" }}>
                  <BadgeGlyph tier={b.tier} earned={b.earned} size={42} style={badgeStyle} theme={theme}/>
                  <div style={{ fontSize: 10, color: theme.inkMuted, marginTop: 2 }}>{b.name}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={panelStyle(theme)}>
            <div style={panelHeader(theme, font)}>About</div>
            <div style={{ padding: 16, fontSize: 12.5, color: theme.inkSoft, lineHeight: 1.55 }}>
              Software engineer by trade; Rover since 2022. Interests: long-distance hiking, community service, writing about the practice of service.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function PubStat({ n, label, theme, font }) {
  return (
    <div style={{ textAlign: "left", paddingRight: 14 }}>
      <div style={{ fontFamily: font.serif, fontSize: 26, fontWeight: 500, color: theme.ink, lineHeight: 1, letterSpacing: -0.4 }}>{n}</div>
      <div style={{ fontFamily: FONT_B_MONO, fontSize: 9.5, color: theme.inkMuted, letterSpacing: 1.2, textTransform: "uppercase", marginTop: 4 }}>{label}</div>
    </div>
  );
}

// ─── Tiny shared style helpers ────────────────────────────────
const panelStyle = (theme) => ({
  background: theme.card, border: `1px solid ${theme.rule}`,
  borderRadius: 4, overflow: "hidden",
});
const panelHeader = (theme, font) => ({
  padding: "10px 16px", borderBottom: `1px solid ${theme.rule}`,
  display: "flex", justifyContent: "space-between", alignItems: "center",
  fontFamily: FONT_B_MONO, fontSize: 10, color: theme.inkMuted,
  letterSpacing: 1.2, textTransform: "uppercase",
  background: theme.surface,
});
const sectionH = (theme, font) => ({
  fontFamily: font.serif, fontSize: 19, fontWeight: 500,
  margin: 0, color: theme.ink, letterSpacing: -0.3,
});
const btnPrimary = (theme, font) => ({
  appearance: "none", border: "none", cursor: "pointer",
  background: theme.accent, color: theme.surface,
  fontFamily: font.body, fontSize: 12.5, fontWeight: 600,
  padding: "9px 16px", borderRadius: 3,
  display: "inline-flex", alignItems: "center", gap: 7,
  letterSpacing: 0.1,
  transition: "filter 120ms",
});
const btnGhost = (theme, font) => ({
  appearance: "none", cursor: "pointer",
  background: "transparent", color: theme.ink,
  border: `1px solid ${theme.rule}`,
  fontFamily: font.body, fontSize: 12.5, fontWeight: 500,
  padding: "8px 14px", borderRadius: 3,
  display: "inline-flex", alignItems: "center", gap: 6,
});
const linkBtn = (theme, font) => ({
  appearance: "none", border: "none", background: "transparent",
  color: theme.accent, fontFamily: font.body, fontSize: 12, fontWeight: 500,
  cursor: "pointer", padding: 0,
  display: "inline-flex", alignItems: "center", gap: 4,
});
const inputStyle = (theme, font, full) => ({
  appearance: "none", border: `1px solid ${theme.rule}`,
  background: theme.surface, color: theme.ink,
  fontFamily: font.body, fontSize: 12.5,
  padding: "7px 10px", borderRadius: 3, outline: "none",
  width: full ? "100%" : 130,
});
const selectStyle = (theme, font) => ({
  ...inputStyle(theme, font, false), width: 200,
});
const onbH = (theme, font) => ({
  fontFamily: font.serif, fontSize: 24, fontWeight: 500,
  margin: "0 0 6px 0", color: theme.ink, letterSpacing: -0.3,
});
const onbP = (theme) => ({
  fontSize: 13, color: theme.inkSoft, margin: "0 0 22px 0",
});

function Field({ label, children, theme, font }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, marginRight: 18 }}>
      <div style={{ fontFamily: FONT_B_MONO, fontSize: 9, color: theme.inkMuted, letterSpacing: 1.2, textTransform: "uppercase" }}>{label}</div>
      {children}
    </div>
  );
}
function Field2({ label, children, theme, font }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <div style={{ fontFamily: FONT_B_MONO, fontSize: 9.5, color: theme.inkMuted, letterSpacing: 1.2, textTransform: "uppercase" }}>{label}</div>
      {children}
    </div>
  );
}

// ─── App container per artboard ──────────────────────────────
function ARoverApp({ initialRoute = "dashboard", theme, font, density, layout, badgeStyle }) {
  const [route, setRoute] = React.useState(initialRoute);
  const props = { theme, font, density, layout, badgeStyle, onRoute: setRoute };
  let body;
  if (route === "dashboard") body = <ADashboard {...props}/>;
  else if (route === "logbook") body = <ALogbook {...props}/>;
  else if (route === "compose") body = <ACompose {...props}/>;
  else if (route === "badges") body = <ABadges {...props}/>;
  else if (route === "directory") body = <ADirectory {...props}/>;
  else if (route === "approvals") body = <AApprovals {...props}/>;
  else body = <ADashboard {...props}/>;
  return (
    <AShell theme={theme} font={font} currentRoute={route} onRoute={setRoute} badge={STATS.pendingApprovals} density={density} layout={layout}>
      {body}
    </AShell>
  );
}

Object.assign(window, { ARoverApp, AOnboarding, APublicProfile });
