import type { Metadata } from "next";

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Data Deletion — Assurgit",
  description: "Confirm or request deletion of your Assurgit data.",
  robots: { index: false },
};

interface Props {
  searchParams: Promise<{ code?: string }>;
}

export default async function DataDeletionPage({ searchParams }: Props) {
  const { code } = await searchParams;

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Assurgit</p>
          <h1 className="text-2xl font-bold text-white">
            {code ? "Data Deletion Confirmed" : "Request Data Deletion"}
          </h1>
        </div>

        {code ? (
          <div className="space-y-4">
            <div className="bg-green-950/50 border border-green-800/50 rounded-xl p-5 space-y-3">
              <p className="text-sm text-gray-300">
                Your data deletion request has been received and processed. All data
                associated with your connected Instagram account has been removed from
                our systems.
              </p>
              <div className="bg-gray-900 rounded-lg px-4 py-2 inline-block">
                <p className="text-xs text-gray-500 mb-1">Confirmation code</p>
                <p className="font-mono text-sm text-white tracking-widest">{code}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Keep this confirmation code for your records. If you have further questions,
              contact us at{" "}
              <a href="mailto:cyberasasoftware@gmail.com" className="text-indigo-400 hover:underline">
                cyberasasoftware@gmail.com
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              To request deletion of all data Assurgit holds about you, please send an
              email to:
            </p>
            <a
              href="mailto:cyberasasoftware@gmail.com?subject=Data%20Deletion%20Request&body=Please%20delete%20all%20data%20associated%20with%20my%20account."
              className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-6 py-3 rounded-xl transition-colors"
            >
              cyberasasoftware@gmail.com
            </a>
            <p className="text-xs text-gray-500">
              Include "Data Deletion Request" in the subject line. We will process your
              request within 30 days and send a confirmation.
            </p>
            <p className="text-xs text-gray-600 pt-2">
              You can also disconnect your social accounts at any time from the{" "}
              <a href="/connect" className="text-indigo-400 hover:underline">
                Connect page
              </a>
              , which immediately removes your access tokens from our systems.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
