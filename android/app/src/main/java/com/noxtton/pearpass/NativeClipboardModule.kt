package com.pears.pass

import android.app.AlarmManager
import android.app.PendingIntent
import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.util.Log
import com.facebook.react.bridge.*

class NativeClipboardModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val TAG = "NativeClipboard"
        private var lastCopiedText: String? = null
        private var clearHandler: Handler? = null
        private var clearRunnable: Runnable? = null
    }

    override fun getName(): String {
        return "NativeClipboard"
    }

    @ReactMethod
    fun setStringWithExpiration(text: String, seconds: Double, promise: Promise) {
        try {
            val context = reactApplicationContext
            val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager

            val clip = ClipData.newPlainText("", text)
            clipboard.setPrimaryClip(clip)

            lastCopiedText = text
            scheduleClearClipboard(text, (seconds * 1000).toLong())

            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("CLIPBOARD_ERROR", "Failed to set clipboard with expiration", e)
        }
    }

    @ReactMethod
    fun clearClipboard(promise: Promise) {
        try {
            val context = reactApplicationContext
            val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                clipboard.clearPrimaryClip()
            } else {
                val clip = ClipData.newPlainText("", "")
                clipboard.setPrimaryClip(clip)
            }

            lastCopiedText = null
            cancelScheduledClear()

            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("CLIPBOARD_ERROR", "Failed to clear clipboard", e)
        }
    }

    @ReactMethod
    fun clearIfCurrentMatches(text: String, promise: Promise) {
        try {
            val context = reactApplicationContext
            val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager

            if (clipboard.hasPrimaryClip()) {
                val clipData = clipboard.primaryClip
                if (clipData != null && clipData.itemCount > 0) {
                    val currentText = clipData.getItemAt(0).text?.toString()

                    if (currentText == text) {
                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                            clipboard.clearPrimaryClip()
                        } else {
                            val clip = ClipData.newPlainText("", "")
                            clipboard.setPrimaryClip(clip)
                        }
                        lastCopiedText = null
                        promise.resolve(true)
                        return
                    }
                }
            }

            promise.resolve(false)
        } catch (e: Exception) {
            // Android 10+ restriction workaround
            if (lastCopiedText == text) {
                try {
                    val clipboard = reactApplicationContext.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                        clipboard.clearPrimaryClip()
                    } else {
                        val clip = ClipData.newPlainText("", "")
                        clipboard.setPrimaryClip(clip)
                    }
                    lastCopiedText = null
                    promise.resolve(true)
                } catch (clearError: Exception) {
                    promise.reject("CLIPBOARD_ERROR", "Failed to clear clipboard", clearError)
                }
            } else {
                promise.resolve(false)
            }
        }
    }

    @ReactMethod
    fun isAvailable(promise: Promise) {
        promise.resolve(true)
    }

    private fun scheduleClearClipboard(text: String, delayMillis: Long) {
        cancelScheduledClear()

        clearHandler = Handler(Looper.getMainLooper())
        clearRunnable = Runnable {
            try {
                val context = reactApplicationContext
                val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager

                var shouldClear = true
                try {
                    if (clipboard.hasPrimaryClip()) {
                        val clipData = clipboard.primaryClip
                        if (clipData != null && clipData.itemCount > 0) {
                            val currentText = clipData.getItemAt(0).text?.toString()
                            shouldClear = currentText == text
                        }
                    }
                } catch (e: Exception) {
                    // Android 10+ restriction
                    shouldClear = lastCopiedText == text
                }

                if (shouldClear) {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                        clipboard.clearPrimaryClip()
                    } else {
                        val clip = ClipData.newPlainText("", "")
                        clipboard.setPrimaryClip(clip)
                    }
                    lastCopiedText = null
                }
            } catch (e: Exception) {
                // Silent fail
            }
        }

        clearHandler?.postDelayed(clearRunnable!!, delayMillis)
    }

    private fun cancelScheduledClear() {
        clearRunnable?.let {
            clearHandler?.removeCallbacks(it)
            clearRunnable = null
        }
        clearHandler = null
    }
}