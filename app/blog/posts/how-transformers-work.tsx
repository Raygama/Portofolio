/* eslint-disable react/no-unescaped-entities */
import TokenizerViz from '@/app/blog/components/TokenizerViz';
import AttentionViz from '@/app/blog/components/AttentionViz';
import EmbeddingViz from '@/app/blog/components/EmbeddingViz';

export default function HowTransformersWork() {
  return (
    <>
      <p className="bp-lede">
        In June 2017, eight Google researchers uploaded a paper to arXiv called "Attention Is All You Need."
        It was supposed to be about machine translation. It ended up being the blueprint for GPT, Claude, Gemini,
        Stable Diffusion, AlphaFold, and pretty much every major AI system released in the years after.
        If you've ever wondered what's actually happening inside an LLM, this is where it starts.
      </p>

      <h2>The thing that came before</h2>

      <p>
        To understand why transformers were such a big deal, you have to understand what people were
        using before them. The dominant architecture for anything language-related was called an RNN,
        a Recurrent Neural Network. The idea was simple: you feed it words one at a time, left to right,
        and it maintains a running "memory" as a hidden state that gets passed from step to step.
      </p>

      <p>
        It kind of worked. But it had two nasty problems. First, you can't parallelize sequential
        processing, which made training on GPUs brutally slow. Second, and more fundamental: by the
        time the model got to word 80 in a sentence, the signal from word 1 had been diluted through
        79 rounds of matrix multiplication. The model literally forgot what it read. Long-range
        dependencies, the kind you need to actually understand paragraphs, were really hard to learn.
      </p>

      <p>
        The transformer paper's core idea was: throw out the sequential processing entirely. Process
        every word at the same time, and let every word directly compare itself to every other word.
        That's it. That's the insight that changed everything.
      </p>

      <h2>Step one: tokenization</h2>

      <p>
        A model can't read text. It reads numbers. So before anything else, the model converts your
        text into tokens, which are roughly words or word chunks, and maps each one to an integer ID
        from a fixed vocabulary. GPT-4 has a vocabulary of about 100,000 tokens. The scheme most
        models use is called Byte-Pair Encoding, where common words get their own token and rare words
        get split into recognizable pieces.
      </p>

      <p>
        This is more consequential than it sounds. The word "transformers" might tokenize as two pieces.
        "GPT-4" might become three. Languages that have lots of long compound words, like Finnish or
        German, end up needing way more tokens per sentence than English does, which means those
        models effectively have shorter context windows for those languages. Tokenization is a quiet
        but real source of model bias.
      </p>

      <TokenizerViz />

      <h2>Step two: embeddings</h2>

      <p>
        So you have a list of integers. Token 3120 and token 3121 mean completely different things,
        but as raw integers they're just... adjacent. You can't do useful math on them. So the model
        maps each token to a high-dimensional vector, usually 768 or 4096 or 8192 numbers long
        depending on the model size. This vector is the embedding.
      </p>

      <p>
        What makes embeddings interesting is that after training, semantically related words end up
        geometrically close to each other in that high-dimensional space. The classic demo: king minus
        man plus woman gives you a vector that's very close to queen. That's not hand-coded. That's
        just what falls out of training on enough text. The model discovers that "gender" is a
        consistent direction in the space, and the same offset that separates king from queen
        separates actor from actress and waiter from waitress.
      </p>

      <EmbeddingViz />

      <p>
        These embeddings are learned parameters, meaning the model starts with random vectors and
        gradually tunes them through training until they encode actually useful relationships. The
        embedding matrix for a large model can have billions of parameters by itself.
      </p>

      <h2>Positional encoding: injecting a sense of order</h2>

      <p>
        Here's a subtle problem. If you process all tokens simultaneously, you've lost track of
        which one came first. "Dog bites man" and "Man bites dog" have the same tokens, just
        in different order. For a model that sees all of them at once with no sense of position,
        those two sentences look identical.
      </p>

      <p>
        The original transformer paper fixed this with something called positional encoding. For
        each position in the sequence, they generate a unique pattern using sine and cosine waves
        at different frequencies, then add that pattern directly to the token's embedding vector.
        So instead of changing the architecture, they just bake position information into the
        numbers the model is already working with.
      </p>

      <p>
        Modern models mostly use learned positional embeddings or something called RoPE (Rotary
        Position Embedding), which handles long sequences better. But the original sinusoidal
        approach still works, and the math behind it is genuinely elegant.
      </p>

      <h2>Self-attention: the actual breakthrough</h2>

      <p>
        This is the part the paper is named after. Everything else is useful engineering. Attention
        is the idea that actually changed the field.
      </p>

      <p>
        For each token, the model creates three vectors by multiplying the embedding through three
        separate learned matrices. These are called the Query, the Key, and the Value. The intuition:
        the Query is what this token is looking for. The Key is what this token has to offer. The
        Value is the actual information it will contribute.
      </p>

      <p>
        To figure out how much token i should pay attention to token j, you take the dot product of
        i's Query with j's Key. A high dot product means they're a good match. You do this for all
        pairs, run the scores through a softmax so they sum to 1, then take a weighted sum of all
        the Value vectors. The result is a new representation of token i that has absorbed information
        from all the other tokens, weighted by how relevant each one was.
      </p>

      <div className="bp-formula">
        <code>Attention(Q, K, V) = softmax( QK&#7488; / &radic;d&#8342; ) &middot; V</code>
      </div>

      <p>
        The division by the square root of the key dimension is there to keep the dot products from
        getting too large as the model grows. Without it, the softmax saturates and gradients basically
        disappear.
      </p>

      <p>
        What makes this powerful: every token attends to every other token in a single parallel
        operation. There's no sequential bottleneck. "It" in "The cat sat on the mat because it
        was tired" can directly look at "cat" and figure out the reference without threading through
        every word in between. Hover over "it" in the grid below and watch where the attention goes.
      </p>

      <AttentionViz />

      <h2>Multi-head attention: looking from multiple angles</h2>

      <p>
        One set of Q, K, V matrices gives you one "view" of the relationships in the sentence.
        But language is complicated. A word might need to resolve a pronoun reference, track subject-verb
        agreement, and respect a discourse-level constraint all at the same time. One attention
        pattern can't do all of that simultaneously.
      </p>

      <p>
        The transformer runs several attention mechanisms in parallel, each with its own Q, K, V
        weights. The original paper used eight heads. Each head learns to attend to different kinds
        of relationships independently. You concatenate all the outputs and project them back down
        with one more matrix multiplication.
      </p>

      <p>
        Researchers have probed trained models and found specific heads that consistently track
        coreference, others that handle syntactic dependencies, others that seem to do something
        related to position. The model discovers these linguistic features on its own. Nobody
        programmed them in. That's either impressive or slightly unsettling depending on your mood.
      </p>

      <h2>The feed-forward layers (and where facts live)</h2>

      <p>
        After attention, each token's representation passes through a feed-forward network: two
        linear layers with a non-linearity between them. The inner dimension is typically 4x the
        model size, so in GPT-2's 768-dimensional model, the FFN expands to 3072 dimensions in
        the middle. It runs independently on each token, so it's parallelizable.
      </p>

      <p>
        Recent interpretability research suggests these FFN layers are where factual knowledge
        lives. When you ask an LLM "what's the capital of France," the attention heads route to
        the relevant context, but the FFN layers are where "Paris" gets recalled. They function
        more like key-value memories than traditional neural network layers. Which is interesting
        because it means the "reasoning" and the "knowing" are happening in different parts of
        the model.
      </p>

      <h2>Residual connections and layer norm</h2>

      <p>
        Two more pieces that don't get enough credit. Every sub-layer in a transformer has a
        residual connection: the output is LayerNorm(x + Sublayer(x)), where x is the input.
        The "x +" part means each layer adds to the representation rather than replacing it.
        This also gives gradients a direct path back through the network during training, which
        is why you can stack 96 layers without the training exploding.
      </p>

      <p>
        Layer normalization keeps activations in a reasonable range at each step. Without it,
        deep attention stacks tend to diverge fast.
      </p>

      <h2>Encoder-only, decoder-only, and the full thing</h2>

      <p>
        The original paper used a full encoder-decoder architecture for translation. The encoder
        reads the source sentence and builds a rich contextual representation. The decoder generates
        the output word by word, attending to both what it's already generated (with masking, so it
        can't peek at future tokens) and the encoder's output (called cross-attention).
      </p>

      <p>
        Modern LLMs like GPT are decoder-only. They just stack decoder layers and train on next-token
        prediction. BERT is encoder-only, great for classification and understanding tasks.
        T5, mT5, and most translation models keep the full encoder-decoder. The choice depends on
        what you're building.
      </p>

      <h2>Why it all works at scale</h2>

      <p>
        The training objective for a language model is simple: given the previous tokens, predict the
        next one. Do that on trillions of tokens, and something strange happens. The model doesn't
        just get better at predicting the next word. It develops internal representations of grammar,
        facts, reasoning patterns, and things that look a lot like theory of mind, even though nothing
        in the training signal explicitly asked for any of that.
      </p>

      <p>
        Part of why this works is that next-token prediction is a surprisingly hard problem if you
        actually want to do it well. To predict the next word in a philosophy paper, you need to
        understand what was argued three paragraphs ago. To predict code, you need to track variable
        scopes. The task forces the model to learn structure whether it wants to or not.
      </p>

      <p>
        And because attention is fully parallel, training is fast enough to scale to model sizes
        that would have been physically impossible with LSTMs. GPT-3 has 175 billion parameters.
        Training it on an LSTM-style architecture would have taken decades on the same hardware.
        On transformers, it took months.
      </p>

      <h2>What still doesn't work great</h2>

      <p>
        Attention is O(n²) in sequence length. Double the context window and you quadruple the
        memory and compute. This is why 100k-token context windows require so much engineering work
        (Flash Attention, sliding window attention, linear attention approximations).
        It's an active research area with no clean solution yet.
      </p>

      <p>
        Transformers also have no persistent state across conversations. Every inference starts
        completely fresh. The "memory" you see in ChatGPT is the conversation history being
        stuffed back into the context window, not anything stored inside the model.
      </p>

      <p>
        And hallucination. The model is trained to produce plausible next tokens, not to produce
        true next tokens. Those aren't the same objective. A fluent, confident, completely
        fabricated answer is entirely consistent with the training signal. Fixing this requires
        either retrieval-augmented generation (giving the model access to actual sources) or
        reinforcement learning from human feedback (RLHF) to teach it when to decline, neither
        of which fully solves the problem.
      </p>

      <h2>So what did the paper actually change</h2>

      <p>
        Before 2017, "scale up the model and train on more data" was not really a viable strategy.
        Sequential processing meant training time grew too fast. The transformer made scaling feasible
        because everything is parallelizable. That's the practical unlock.
      </p>

      <p>
        But the deeper change was that it turned out one architecture could work across almost every
        domain. Text, images (Vision Transformer), audio (Whisper), protein sequences (AlphaFold 2),
        video, code, multimodal tasks. Before transformers, different problems had different
        architectures. After transformers, there's basically one, plus scaling and fine-tuning.
      </p>

      <p>
        The title "Attention Is All You Need" sounds like a provocation. In 2017 it was a claim.
        By 2024 it had turned into a pretty accurate description of how every serious AI system is built.
      </p>

      <div className="bp-callout teal" style={{ marginTop: 48 }}>
        <strong>Quick summary</strong>
        <p style={{ margin: '10px 0 0' }}>
          Transformers replace sequential recurrence with parallel self-attention. Each token computes
          Query, Key, and Value vectors. Attention scores are dot products between Q and K, normalized
          with softmax, applied as weights over V. Multiple attention heads run in parallel. Positional
          encoding injects order. Feed-forward layers store factual knowledge. Residual connections
          keep training stable. Stack enough of these layers, train on enough tokens, and emergent
          capabilities appear that nobody explicitly designed for.
        </p>
      </div>

      <h2>References</h2>
      <ul className="bp-references">
        <li>
          Vaswani, A., Shazeer, N., Parmar, N., et al. (2017).
          Attention Is All You Need. Advances in Neural Information Processing Systems.
          {' '}<a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noopener noreferrer">arXiv:1706.03762</a>
        </li>
        <li>
          Devlin, J., Chang, M., Lee, K., and Toutanova, K. (2018).
          BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding.
          {' '}<a href="https://arxiv.org/abs/1810.04805" target="_blank" rel="noopener noreferrer">arXiv:1810.04805</a>
        </li>
        <li>
          Hoffmann, J., Borgeaud, S., Mensch, A., et al. (2022).
          Training Compute-Optimal Large Language Models.
          {' '}<a href="https://arxiv.org/abs/2203.15556" target="_blank" rel="noopener noreferrer">arXiv:2203.15556</a>
        </li>
        <li>
          Meng, K., et al. (2022). Locating and Editing Factual Associations in GPT.
          {' '}<a href="https://arxiv.org/abs/2202.05262" target="_blank" rel="noopener noreferrer">arXiv:2202.05262</a>
        </li>
      </ul>
    </>
  );
}
