# Introduction

Welcome to <%= config[:service_name] %> API Reference. This reference will help you to create new, more effective S2S or M2S integration.

Our API is RESTful and you can use any language to work with it.

We provide examples as:

- cURL
- Javascript (web)
- Swift (iOS)
- Kotlin (Android)
- Java (Android)

Every request in this API can include a set of parameters — some mandatory, others optional.

Optional parameters may affect how requests are processed.

For example, the stream parameter (explained below) provides a way to label the source of data.

<aside class="notice">

    <p>Some requests may require the <code>stream</code> parameter in the request body, while for others it is optional.</p>

    <p>The <code>stream</code> parameter identifies the channel from which the data originates — in other words, it is a label that enables simple and flexible segmentation of data.</p>

    <p>The list of streams is defined entirely by the merchant; no registration or pre-configuration is required.</p>

    <p>Values are case-sensitive and character-sensitive: for example, <code>ios_17</code> and <code>ios__17</code> are treated as two different streams.</p>

    <p>Allowed characters: Latin letters (<code>a–z</code>, <code>A–Z</code>), digits (<code>0–9</code>), underscore (<code>_</code>).</p>

</aside>