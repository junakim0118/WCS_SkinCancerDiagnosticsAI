"use client";
import Link from "next/link";
import { useState } from "react";

export default function DiagnosticsPage() {
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

    const [error, setError] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setError("");
        setResult(null);
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const analyzeImage = async () => {
        if (!image) {
            setError("Please choose an image first.");
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const fd = new FormData();
            fd.append("file", image);

            const res = await fetch(`${API_BASE}/predict`, {
            method: "POST",
            body: fd,
            });

            if (!res.ok) {
            const msg = await res.text();
            throw new Error(msg || "Request failed");
            }

            const data = await res.json();
            setResult(data);
        } catch (err) {
            setError(err?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const downloadReport = async () => {
        if (!image) {
            setError("Please choose an image first.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const fd = new FormData();
            fd.append("file", image);

            const res = await fetch(`${API_BASE}/report`, {
            method: "POST",
            body: fd,
            });

            if (!res.ok) {
            const msg = await res.text();
            throw new Error(msg || "Report request failed");
            }

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);

            // open PDF in a new tab
            window.open(url, "_blank", "noopener,noreferrer");
        } catch (err) {
            setError(err?.message || "Could not generate report.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-white text-slate-900">
        {/* Top bar */}
        <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-slate-200">
            <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-semibold tracking-tight">
                Skin Cancer AI
            </Link>

            <div className="flex items-center gap-2">
                <Link
                href="/"
                className="text-sm rounded-full px-4 py-2 border border-slate-200 hover:bg-slate-50"
                >
                Back
                </Link>
            </div>
            </div>
        </header>

        {/* Hero (green blob aesthetic like your mock) */}
        <section className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-emerald-300/70 blur-3xl" />
            <div className="absolute top-10 right-[-120px] h-[420px] w-[420px] rounded-full bg-teal-300/60 blur-3xl" />
            <div className="absolute bottom-[-160px] left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-lime-200/60 blur-3xl" />
            </div>

            <div className="mx-auto max-w-6xl px-4 py-14 relative">
            <div className="rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-700 text-white p-10 md:p-14 shadow-xl">
                <p className="text-white/80 text-sm mb-3">Try Diagnostics</p>
                <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
                Upload a skin image for an AI-assisted assessment
                </h1>
                <p className="mt-4 max-w-4xl text-white/80">
                Informational only — not a medical diagnosis. If you’re concerned, contact a licensed healthcare professional.
                </p>
            </div>
            </div>
        </section>

        {/* Try area */}
        <section id="try" className="mx-auto max-w-6xl px-4 py-10 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Upload card */}
            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 flex flex-col">
                <h2 className="text-lg font-semibold">Upload image</h2>
                <p className="mt-1 text-sm text-slate-600">
                JPG/PNG recommended. Best results: sharp focus, good lighting, centered lesion.
                </p>

                <div className="mt-5">
                <label className="block">
                    <span className="text-sm text-slate-700">Choose file</span>
                    <input
                    type="file"
                    accept="image/*"
                    className="mt-2 block w-full text-sm
                                file:mr-4 file:rounded-full file:border-0
                                file:bg-emerald-600 file:px-4 file:py-2 file:text-white
                                hover:file:bg-emerald-700
                                text-slate-600"
                    onChange={handleFileChange}
                    />
                </label>
                </div>

                {/* Preview placeholder */}
                {preview ? (
                    <div className="mt-5 flex justify-center">
                        <img
                            src={preview}
                            alt="Preview"
                            className="rounded-2xl max-h-64 object-contain"
                        />
                    </div>
                    ) : (
                    <div className="mt-5 rounded-xl bg-gray-200 h-56 flex items-center justify-center">
                        Image preview
                    </div>
                )}

                <button
                    type="button"
                    onClick={analyzeImage}
                    className="mt-5 w-full rounded-2xl bg-emerald-600 py-3 text-white font-medium hover:bg-emerald-700"
                    disabled={loading}
                >
                    {loading ? "Analyzing..." : "Analyze"}
                </button>

                <p className="mt-3 text-xs text-slate-500">
                This tool does not provide medical advice.
                </p>
            </div>

            {/* Result card */}
                <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 flex flex-col justify-between">
                <h2 className="text-lg font-semibold">Result</h2>

                <div className="text-sm text-slate-400">
                    Disclaimer: This output is generated by an AI model and is NOT a medical diagnosis.
                    If you have concerns about a skin lesion, consult a qualified healthcare professional.
                </div>

                {/* Error message (optional) */}
                {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

                <div className="mt-3 rounded-2xl bg-slate-100 border border-slate-200 p-5 flex flex-col gap-4 flex-1 justify-between">
                    {/* When result exists */}
                    {result ? (
                    <>
                        <div className="flex flex-col min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between gap-1">
                            <span className="text-lg font-semibold text-slate-800">Prediction</span>
                            <span className="text-lg text-slate-700">
                                {result.label} ({result.confidence_pct}%)
                            </span>
                        </div>

                        {/* Probability bars */}
                        <div className=" space-y-3">
                        {Object.entries(result.probabilities_pct).map(([name, pct]) => (
                            <div key={name}>
                            <div className="flex justify-between text-sm text-slate-600">
                                <span>{name}</span>
                                <span>{pct}%</span>
                            </div>

                            <div className="mt-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                                <div
                                className="h-2 bg-emerald-600"
                                style={{ width: `${pct}%` }}
                                />
                            </div>
                            </div>
                        ))}
                        </div>

                        <button
                            type="button"
                            onClick={downloadReport}
                            className="mt-3 w-full rounded-2xl border border-emerald-600 text-emerald-600 py-3 font-medium hover:bg-emerald-50"
                            disabled={loading}
                        >
                            {loading ? "Generating..." : "Open PDF report"}
                        </button>
                    </>
                    ) : (
                    /* When no result yet */
                    <>
                        <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-800">Prediction</span>
                        <span className="text-sm text-slate-500">
                            {loading ? "Analyzing..." : ""}
                        </span>
                        </div>

                        <div className="mt-4 space-y-3">
                        <SkeletonRow />
                        <SkeletonRow />
                        <SkeletonRow />
                        <SkeletonRow />
                        <SkeletonRow />
                        <SkeletonRow />
                        <SkeletonRow />
                        <SkeletonRow />
                        </div>

                        <div className="mt-5 rounded-xl bg-white border border-slate-200 p-4 text-sm text-slate-600">
                        <div className="font-semibold text-slate-800 mb-1">Notes</div>
                        Upload an image and click Analyze to see results.
                        </div>
                    </>
                    )}
                </div>
                {result && (
                    <div>
                        <div className="mt-3 font-semibold text-slate-800 mb-1">Recommendation</div>
                        <p className="text-sm text-slate-700">
                            {result.recommendation}
                        </p>
                    </div>
                )}
            </div>
            </div>
        </section>

        {/* Bottom decorative strip */}
        <footer className="relative overflow-hidden border-t border-slate-200">
            <div className="pointer-events-none absolute inset-0">
            <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-emerald-300/60 blur-3xl" />
            <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-teal-300/60 blur-3xl" />
            </div>
            <div className="mx-auto max-w-6xl px-4 py-10 relative text-sm text-slate-600">
            Powered by Western Cyber Society • © 2026
            </div>
        </footer>
        </main>
    );
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-2.5 w-28 rounded-full bg-slate-200" />
      <div className="h-2.5 flex-1 rounded-full bg-slate-200" />
      <div className="h-2.5 w-10 rounded-full bg-slate-200" />
    </div>
  );
}