const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')

const expoFriendlyStoryboard = `<?xml version="1.0" encoding="UTF-8"?>
<document type="com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB" version="3.0" toolsVersion="32700.99.1234" targetRuntime="iOS.CocoaTouch" propertyAccessControl="none" useAutolayout="YES" launchScreen="YES" useTraitCollections="YES" useSafeAreas="YES" colorMatched="YES" initialViewController="EXPO-VIEWCONTROLLER-1">
    <device id="retina6_12" orientation="portrait" appearance="light"/>
    <dependencies>
        <deployment identifier="iOS"/>
        <plugIn identifier="com.apple.InterfaceBuilder.IBCocoaTouchPlugin" version="22685"/>
        <capability name="Named colors" minToolsVersion="9.0"/>
        <capability name="Safe area layout guides" minToolsVersion="9.0"/>
        <capability name="documents saved in the Xcode 8 format" minToolsVersion="8.0"/>
    </dependencies>
    <scenes>
        <scene sceneID="EXPO-SCENE-1">
            <objects>
                <viewController storyboardIdentifier="SplashScreenViewController" id="EXPO-VIEWCONTROLLER-1" sceneMemberID="viewController">
                    <view key="view" userInteractionEnabled="NO" contentMode="scaleToFill" insetsLayoutMarginsFromSafeArea="NO" id="EXPO-ContainerView" userLabel="ContainerView">
                        <rect key="frame" x="0.0" y="0.0" width="393" height="852"/>
                        <autoresizingMask key="autoresizingMask" flexibleMaxX="YES" flexibleMaxY="YES"/>
                        <subviews>
                            <imageView id="EXPO-SplashScreen" userLabel="SplashScreenLogo" image="SplashScreenLogo" contentMode="scaleAspectFit" clipsSubviews="true" userInteractionEnabled="false" translatesAutoresizingMaskIntoConstraints="false">
                                <rect key="frame" x="121.5" y="351" width="150" height="150"/>
                            </imageView>
                        </subviews>
                        <viewLayoutGuide key="safeArea" id="Rmq-lb-GrQ"/>
                        <constraints>
                            <constraint firstItem="EXPO-SplashScreen" firstAttribute="centerX" secondItem="EXPO-ContainerView" secondAttribute="centerX" id="cad2ab56f97c5429bf29decf850647a4216861d4"/>
                            <constraint firstItem="EXPO-SplashScreen" firstAttribute="centerY" secondItem="EXPO-ContainerView" secondAttribute="centerY" id="1a145271b085b6ce89b1405a310f5b1bb7656595"/>
                        </constraints>
                        <color key="backgroundColor" name="SplashScreenBackground"/>
                    </view>
                </viewController>
                <placeholder placeholderIdentifier="IBFirstResponder" id="EXPO-PLACEHOLDER-1" userLabel="First Responder" sceneMemberID="firstResponder"/>
            </objects>
            <point key="canvasLocation" x="0.0" y="0.0"/>
        </scene>
    </scenes>
    <resources>
        <image name="SplashScreenLogo" width="150" height="150"/>
        <namedColor name="SplashScreenBackground">
            <color alpha="1.000" blue="0.137254901960784" green="0.137254901960784" red="0.137254901960784" customColorSpace="sRGB" colorSpace="custom"/>
        </namedColor>
    </resources>
</document>`

const customFullScreenStoryboard = `<?xml version="1.0" encoding="UTF-8"?>
<document type="com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB" version="3.0" toolsVersion="23727" targetRuntime="iOS.CocoaTouch" propertyAccessControl="none" useAutolayout="YES" launchScreen="YES" useTraitCollections="YES" useSafeAreas="YES" colorMatched="YES" initialViewController="EXPO-VIEWCONTROLLER-1">
    <device id="retina6_12" orientation="portrait" appearance="light"/>
    <dependencies>
        <deployment identifier="iOS"/>
        <plugIn identifier="com.apple.InterfaceBuilder.IBCocoaTouchPlugin" version="23721"/>
        <capability name="Named colors" minToolsVersion="9.0"/>
        <capability name="Safe area layout guides" minToolsVersion="9.0"/>
        <capability name="documents saved in the Xcode 8 format" minToolsVersion="8.0"/>
    </dependencies>
    <scenes>
        <!--View Controller-->
        <scene sceneID="EXPO-SCENE-1">
            <objects>
                <viewController storyboardIdentifier="SplashScreenViewController" id="EXPO-VIEWCONTROLLER-1" sceneMemberID="viewController">
                    <view key="view" userInteractionEnabled="NO" contentMode="scaleToFill" insetsLayoutMarginsFromSafeArea="NO" id="EXPO-ContainerView" userLabel="ContainerView">
                        <rect key="frame" x="0.0" y="0.0" width="393" height="852"/>
                        <autoresizingMask key="autoresizingMask"/>
                        <subviews>
                            <imageView clipsSubviews="YES" userInteractionEnabled="NO" contentMode="scaleAspectFill" fixedFrame="YES" image="SplashImage" translatesAutoresizingMaskIntoConstraints="NO" id="z1R-Jr-8G1">
                                <rect key="frame" x="0.0" y="0.0" width="393" height="852"/>
                                <autoresizingMask key="autoresizingMask" widthSizable="YES" heightSizable="YES"/>
                            </imageView>
                        </subviews>
                        <viewLayoutGuide key="safeArea" id="Rmq-lb-GrQ"/>
                        <color key="backgroundColor" name="SplashScreenBackground"/>
                    </view>
                </viewController>
                <placeholder placeholderIdentifier="IBFirstResponder" id="EXPO-PLACEHOLDER-1" userLabel="First Responder" sceneMemberID="firstResponder"/>
            </objects>
            <point key="canvasLocation" x="-0.76335877862595414" y="0.0"/>
        </scene>
    </scenes>
    <resources>
        <image name="SplashImage" width="430" height="932"/>
        <namedColor name="SplashScreenBackground">
            <color red="0.13725490868091583" green="0.13725490868091583" blue="0.13725490868091583" alpha="1" colorSpace="custom" customColorSpace="sRGB"/>
        </namedColor>
    </resources>
</document>`

const findStoryboardPath = () => {
  const projectRoot = path.resolve(__dirname, '..')
  const iosPath = path.join(projectRoot, 'ios')

  if (!fs.existsSync(iosPath)) {
    return null
  }

  const dirs = fs
    .readdirSync(iosPath, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)

  const projectDir = dirs.find((name) =>
    fs.existsSync(path.join(iosPath, name, 'SplashScreen.storyboard'))
  )

  if (!projectDir) {
    return null
  }

  return path.join(iosPath, projectDir, 'SplashScreen.storyboard')
}

const replaceStoryboard = (content) => {
  const storyboardPath = findStoryboardPath()

  if (!storyboardPath) {
    process.exit(1)
  }

  fs.writeFileSync(storyboardPath, content, 'utf-8')
}

const runExpoPrebuild = (args = []) =>
  new Promise((resolve, reject) => {
    const child = spawn('npx', ['expo', 'prebuild', ...args], {
      stdio: 'inherit',
      shell: true
    })

    child.on('exit', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`expo prebuild failed with code: ${code}`))
      }
    })
  })

const main = async () => {
  const args = process.argv.slice(2)
  const isClean = args.includes('--clean')
  const platformArg = args.find((arg) => arg === 'ios' || arg === 'android')
  const platform = platformArg || 'ios'

  if (platform === 'android') {
    process.exit(0)
  }

  try {
    replaceStoryboard(expoFriendlyStoryboard)
    await runExpoPrebuild(
      isClean ? ['--clean', '--platform', platform] : ['--platform', platform]
    )
    replaceStoryboard(customFullScreenStoryboard)
    // eslint-disable-next-line no-console
    console.log('Done! ✅')
  } catch (error) {
    process.exit(1)
  }
}

main()
